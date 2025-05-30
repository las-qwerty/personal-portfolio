import '../../app/globals.css';

const letters = ['L', 'a', 'w', 'r', 'e', 'n', 'c', 'e',];

export default function LawrenceLoader() {
  return (
    <div className="lawrence-loader">
      {letters.map((letter, idx) => (
        <span key={idx} className="lawrence-letter" style={{ animationDelay: `${idx * 0.15}s` }}>
          {letter}
        </span>
      ))}
    </div>
  );
}
