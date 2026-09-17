const elements = [
  "💗",
  "💖",
  "💕",
  "💓",
  "💞",
  "💘",
  "❤️",
  "🩷",
  "✨",
  "🌟",
  "⭐",
  "🧸",
  "🍬",
  "🎀",
  "🌸",
  "🦋",
  "🥰",
  "😘",
  "💫",
];

const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">

      {Array.from({ length: 45 }).map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 15;
        const size = Math.random() * 18 + 14;
        const duration = Math.random() * 12 + 12;
        const rotation = Math.random() * 40 - 20;
        const opacity = Math.random() * 0.35 + 0.45;

        const emoji =
          elements[Math.floor(Math.random() * elements.length)];

        return (
          <span
            key={i}
            className="floating-element absolute bottom-[-50px] select-none"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              fontSize: `${size}px`,
              opacity,
              transform: `rotate(${rotation}deg)`,
            }}
          >
            {emoji}
          </span>
        );
      })}

    </div>
  );
};

export default FloatingElements;