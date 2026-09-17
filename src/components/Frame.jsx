import { useEffect, useRef, useState } from "react";

const Frame = ({ image, video, text, onNext }) => {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(true);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.play().catch(() => setIsPlaying(false));

    const update = () => setProgress(v.currentTime);
    v.addEventListener("timeupdate", update);

    return () => v.removeEventListener("timeupdate", update);
  }, [video]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;

    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const skip = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const handleSeek = (e) => {
    const value = Number(e.target.value);

    if (videoRef.current) {
      videoRef.current.currentTime = value;
      setProgress(value);
    }
  };

  const handleVolume = (e) => {
    const value = Number(e.target.value);

    if (!videoRef.current) return;

    videoRef.current.volume = value;
    videoRef.current.muted = value === 0;

    setVolume(value);
    setMuted(value === 0);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  const toggleFullscreen = () => {
    const v = videoRef.current;
    if (!v) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      v.requestFullscreen();
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative h-full w-full flex items-center justify-center px-4 sm:px-6 md:px-10 overflow-hidden">

      {/* Background decoration */}
      <div className="absolute -top-32 -left-32 w-72 sm:w-96 h-72 sm:h-96 bg-pink-300 rounded-full blur-3xl opacity-40" />

      <div className="absolute -bottom-32 -right-32 w-72 sm:w-96 h-72 sm:h-96 bg-purple-300 rounded-full blur-3xl opacity-40" />

      {/* MAIN */}
      <div className="
        relative
        w-full
        max-w-7xl
        h-full
        md:h-auto
        grid
        grid-cols-1
        md:grid-cols-2
        gap-4
        sm:gap-6
        lg:gap-16
        items-center
        py-3
        sm:py-5
        md:py-0
      ">

        {/* ================= VIDEO ================= */}
        <div className="flex justify-center min-w-0">

          <div
            className="
              relative
              w-full
              max-w-[500px]
              h-[42vh]
              sm:h-[48vh]
              md:h-[min(70vh,560px)]
              bg-white/90
              backdrop-blur-xl
              rounded-[2rem]
              sm:rounded-[2.5rem]
              md:rounded-[3rem]
              shadow-2xl
              p-3
              sm:p-4
              md:p-5
              flex
              items-center
              justify-center
              overflow-hidden
              group
            "
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
            onTouchStart={() => setShowControls(true)}
          >

            {video ? (
              <>
                <video
                  ref={videoRef}
                  src={video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  onLoadedMetadata={() => {
                    if (videoRef.current) {
                      setDuration(videoRef.current.duration);
                    }
                  }}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onClick={togglePlay}
                  className="
                    w-full
                    h-full
                    object-contain
                    rounded-[1.5rem]
                    sm:rounded-[2rem]
                    md:rounded-[2.5rem]
                    cursor-pointer
                  "
                />

                {/* Controls */}
                <div
                  className={`
                    absolute
                    bottom-3
                    sm:bottom-4
                    md:bottom-5
                    left-3
                    sm:left-4
                    md:left-5
                    right-3
                    sm:right-4
                    md:right-5
                    rounded-b-[1.5rem]
                    sm:rounded-b-[2rem]
                    md:rounded-b-[2.5rem]
                    pt-12
                    sm:pt-14
                    md:pt-16
                    pb-3
                    px-3
                    sm:px-4
                    md:px-5
                    bg-gradient-to-t
                    from-black/75
                    via-black/35
                    to-transparent
                    transition-all
                    duration-300
                    ${
                      showControls
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                    }
                  `}
                >

                  {/* Progress */}
                  <div className="flex items-center gap-2 mb-2">

                    <span className="text-white text-[10px] sm:text-xs">
                      {formatTime(progress)}
                    </span>

                    <input
                      type="range"
                      min="0"
                      max={duration || 0}
                      value={progress}
                      onChange={handleSeek}
                      className="video-range flex-1"
                    />

                    <span className="text-white text-[10px] sm:text-xs">
                      {formatTime(duration)}
                    </span>

                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-1 sm:gap-2">

                      <button
                        onClick={() => skip(-10)}
                        className="video-control"
                      >
                        ↶
                        <span className="absolute text-[7px] sm:text-[8px]">
                          10
                        </span>
                      </button>

                      <button
                        onClick={togglePlay}
                        className="video-play"
                      >
                        {isPlaying ? "❚❚" : "▶"}
                      </button>

                      <button
                        onClick={() => skip(10)}
                        className="video-control"
                      >
                        ↷
                        <span className="absolute text-[7px] sm:text-[8px]">
                          10
                        </span>
                      </button>

                    </div>

                    <div className="flex items-center gap-2">

                      <button
                        onClick={toggleMute}
                        className="text-white text-base sm:text-xl"
                      >
                        {muted ? "🔇" : "🔊"}
                      </button>

                      {/* Hide volume slider on very small screens */}
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={muted ? 0 : volume}
                        onChange={handleVolume}
                        className="volume-range hidden sm:block w-16 md:w-20"
                      />

                      <button
                        onClick={toggleFullscreen}
                        className="text-white text-lg sm:text-xl hover:scale-110 transition"
                      >
                        ⛶
                      </button>

                    </div>

                  </div>
                </div>
              </>
            ) : (
              <img
                src={image}
                alt="memory"
                className="
                  w-full
                  h-full
                  object-contain
                  rounded-[1.5rem]
                  sm:rounded-[2rem]
                  md:rounded-[2.5rem]
                "
              />
            )}

          </div>
        </div>

        {/* ================= TEXT ================= */}
        <div
          className="
            bg-white/90
            backdrop-blur-xl
            rounded-[2rem]
            sm:rounded-[2.5rem]
            md:rounded-[3rem]
            p-5
            sm:p-7
            md:p-10
            shadow-2xl
            h-[42vh]
            sm:h-[48vh]
            md:h-[min(70vh,560px)]
            flex
            flex-col
            min-w-0
          "
        >

          <div className="story-scroll flex-1 overflow-y-auto pr-3 sm:pr-4">

            <p
              className="
                text-lg
                sm:text-xl
                md:text-3xl
                lg:text-4xl
                font-medium
                text-gray-700
                leading-relaxed
                whitespace-pre-line
              "
            >
              {text}
            </p>

          </div>

          <div className="pt-4 sm:pt-5 md:pt-6 flex-shrink-0">

            <button
              onClick={onNext}
              className="
                w-full
                sm:w-auto
                px-8
                sm:px-10
                md:px-12
                py-3
                sm:py-3.5
                md:py-4
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
                hover:scale-105
                active:scale-95
                transition-all
              "
            >
              Next 💖
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Frame;