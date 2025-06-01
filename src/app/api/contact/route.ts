import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  const body = await req.json();
  const { name, email, phone, subject, message, projectType, recaptchaToken } = body;

  if (!name || !email || !subject || !message || !recaptchaToken) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  // Verify reCAPTCHA
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  const recaptchaVerifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
  const recaptchaRes = await fetch(recaptchaVerifyUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${recaptchaSecret}&response=${recaptchaToken}`,
  });
  const recaptchaData = await recaptchaRes.json();
  if (!recaptchaData.success) {
    return NextResponse.json({ message: 'reCAPTCHA verification failed' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  try {
    const html = `
      <div style="font-family: 'Inter', Arial, sans-serif; background: #f9fafb; padding: 32px;">
        <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 1rem; box-shadow: 0 2px 8px #0001; padding: 32px; border: 1px solid #e5e7eb;">
          <h2 style="color: #6F4E37; font-size: 2rem; font-weight: 700; margin-bottom: 1.5rem;">New Portfolio Contact</h2>
          <div style="margin-bottom: 1.25rem;">
            <span style="display: inline-block; background: linear-gradient(to right, #6F4E37, #C68642); color: #fff; border-radius: 9999px; padding: 0.25rem 1rem; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem;">${projectType || 'General Inquiry'}</span>
          </div>
          <div style="margin-bottom: 1rem;">
            <strong style="color: #6F4E37;">Name:</strong> ${name}<br>
            <strong style="color: #6F4E37;">Email:</strong> ${email}<br>
            <strong style="color: #6F4E37;">Phone:</strong> ${phone || 'N/A'}<br>
            <strong style="color: #6F4E37;">Subject:</strong> ${subject}
          </div>
          <div style="margin: 1.5rem 0; padding: 1rem; background: #f3f4f6; border-radius: 0.75rem; color: #374151;">
            <strong style="color: #6F4E37;">Message:</strong><br>
            <span style="white-space: pre-line;">${message}</span>
          </div>
          <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 0.875rem; color: #9ca3af; text-align: center;">Sent from your <span style='color:#C68642;font-weight:600;'>portfolio website</span></p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.GMAIL_USER,
      subject: `[Portfolio Contact] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nProject Type: ${projectType}\nSubject: ${subject}\nMessage:\n${message}`,
      html,
    });
    return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Nodemailer error:', error);
    const errMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ message: 'Failed to send message', error: errMsg }, { status: 500 });
  }
}
