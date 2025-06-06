import '../../app/globals.css';

const letters = ['L', 'a', 'w', 'r', 'e', 'n', 'c', 'e',];

export default function LawrenceLoader() {
  return (
    <div className="lawrence-loader">
      {letters.map((letter, idx) => (
        <span key={idx} className="bg-gradient-to-r from-[#6F4E37] to-[#C68642] bg-clip-text text-transparent lawrence-letter" style={{ animationDelay: `${idx * 0.15}s` }}>
          {letter}
        </span>
      ))}
    </div>
  );
}
