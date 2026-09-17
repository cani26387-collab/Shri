import { useState } from "react";

const Question = ({ onYes }) => {
  const [noClicks, setNoClicks] = useState(0);
  const [floating, setFloating] = useState(false);
  const [pos, setPos] = useState({ top: "50%", left: "50%" });

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
    <div className="
      relative
      h-full
      flex
      items-center
      justify-center
      px-4
      sm:px-6
      overflow-hidden
    ">

      <div className="
        relative
        bg-white/90
        backdrop-blur-xl
        rounded-[2rem]
        sm:rounded-[2.5rem]
        md:rounded-[3rem]
        p-6
        sm:p-8
        md:p-12
        shadow-2xl
        text-center
        w-full
        max-w-xl
      ">

        <h2 className="
          text-2xl
          sm:text-3xl
          md:text-4xl
          font-semibold
          text-gray-700
          leading-tight
          mb-8
          sm:mb-10
          md:mb-12
        ">
          So… are you still upset with me, or have you forgiven me now? 🥺❤️
        </h2>

        <div className="
          relative
          min-h-[180px]
          flex
          flex-wrap
          items-center
          justify-center
          gap-4
          sm:gap-6
        ">

          <button
            onClick={onYes}
            className="
              px-7
              sm:px-10
              md:px-12
              py-3
              sm:py-4
              bg-gradient-to-r
              from-green-400
              to-emerald-500
              text-white
              rounded-full
              text-lg
              sm:text-xl
              md:text-2xl
              font-medium
              shadow-lg
              hover:scale-105
              transition-all
              z-10
            "
          >
            Forgiven ❤️
          </button>

          {noClicks === 0 && (
            <button
              onClick={handleNoClick}
              className="
                px-7
                sm:px-10
                md:px-12
                py-3
                sm:py-4
                bg-gradient-to-r
                from-pink-500
                to-rose-500
                text-white
                rounded-full
                text-lg
                sm:text-xl
                md:text-2xl
                font-medium
                shadow-lg
              "
            >
              Still Angry 😤
            </button>
          )}

          {noClicks > 0 && noClicks < 5 && floating && (
            <button
              onClick={handleNoClick}
              style={{
                position: "absolute",
                top: pos.top,
                left: pos.left,
                transform: "translate(-50%, -50%)",
              }}
              className="
                px-7
                sm:px-10
                md:px-12
                py-3
                sm:py-4
                bg-gradient-to-r
                from-pink-500
                to-rose-500
                text-white
                rounded-full
                text-lg
                sm:text-xl
                md:text-2xl
                font-medium
                shadow-lg
              "
            >
              Still Angry 😤
            </button>
          )}

        </div>

        {noClicks >= 7 && (
          <p className="mt-4 text-base sm:text-lg text-gray-500 italic">
            Ab to sirf ek hi jawab bachta hai… 😌💖
          </p>
        )}

      </div>
    </div>
  );
};

export default Question;