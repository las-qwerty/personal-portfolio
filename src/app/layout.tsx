import ClientLayout from "./ClientLayout";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lawrence A-J Soriano",
  description: "Web Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" style={{colorScheme: "light"}}>
      <head>
        <link rel="icon" href="/lawrence-favicon.png" type="image/x-icon" />
      </head>
      <body suppressHydrationWarning={true}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}