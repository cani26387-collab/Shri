import { useState } from "react";

const Question = ({ onYes }) => {
  const [noClicks, setNoClicks] = useState(0);
  const [floating, setFloating] = useState(false);
  const [pos, setPos] = useState({
    top: "50%",
    left: "50%",
  });

  const handleNoClick = () => {
    const next = noClicks + 1;

    setNoClicks(next);

    if (next >= 5) return;

    setFloating(false);

    setTimeout(() => {
      const top = Math.random() * 60 + 20;
      const left = Math.random() * 60 + 20;

      setPos({
        top: `${top}%`,
        left: `${left}%`,
      });

      setFloating(true);
    }, 300);
  };

  return (
    <div className="question-page">

      <div className="question-card">

        <h2 className="question-title">
          So… are you still upset with me, or have you forgiven me now? 🥺❤️
        </h2>

        <div className="question-buttons">

          <button
            onClick={onYes}
            className="yes-button"
          >
            Yes ❤️
          </button>

          {noClicks === 0 && (
            <button
              onClick={handleNoClick}
              className="no-button"
            >
              No 😤
            </button>
          )}

          {noClicks > 0 &&
            noClicks < 5 &&
            floating && (
              <button
                onClick={handleNoClick}
                style={{
                  position: "absolute",
                  top: pos.top,
                  left: pos.left,
                  transform: "translate(-50%, -50%)",
                }}
                className="no-button"
              >
                No 😤
              </button>
            )}

        </div>

        {noClicks >= 5 && (
          <p className="question-message">
            Ab to sirf ek hi jawab bachta hai… 😌💖
          </p>
        )}

      </div>

    </div>
  );
};

export default Question;