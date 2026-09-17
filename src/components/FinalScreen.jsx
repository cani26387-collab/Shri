import { useEffect, useRef, useState } from "react";
import celebrationVideo from "../assets/images/shri4.mp4";

const FinalScreen = ({ onReplay }) => {
  const videoRef = useRef(null);

  const [show, setShow] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(true);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 200);

    const video = videoRef.current;

    if (video) {
      video.play().catch(() => {
        setIsPlaying(false);
      });
    }

    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const updateProgress = () => {
      setProgress(video.currentTime);
    };

    video.addEventListener("timeupdate", updateProgress);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const skip = (seconds) => {
    if (!videoRef.current) return;

    videoRef.current.currentTime += seconds;
  };

  const handleSeek = (e) => {
    const value = Number(e.target.value);

    if (!videoRef.current) return;

    videoRef.current.currentTime = value;
    setProgress(value);
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
    const video = videoRef.current;

    if (!video) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative h-full w-full flex items-center justify-center px-4 sm:px-6 overflow-hidden">

      {/* Final Card */}
      <div
        className={`
          bg-white/90
          backdrop-blur-xl
          rounded-[2rem]
          sm:rounded-[2.5rem]
          md:rounded-[3rem]
          shadow-2xl
          text-center
          w-full
          max-w-4xl
          max-h-[calc(100%-20px)]
          px-5
          sm:px-8
          md:px-10
          py-6
          sm:py-8
          flex
          flex-col
          items-center
          justify-center
          overflow-hidden
          transition-all
          duration-700
          ${show ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        `}
      >

        {/* ================= VIDEO ================= */}
        <div
          className="
            relative
            w-full
            max-w-[650px]
            h-[30vh]
            sm:h-[35vh]
            md:h-[320px]
            bg-black
            rounded-[1.5rem]
            sm:rounded-[2rem]
            shadow-xl
            overflow-hidden
            group
            mb-5
          "
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
          onTouchStart={() => setShowControls(true)}
        >

          <video
            ref={videoRef}
            src={celebrationVideo}
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
              cursor-pointer
            "
          />

          {/* Video Controls */}
          <div
            className={`
              absolute
              bottom-0
              left-0
              right-0
              px-3
              sm:px-5
              pb-3
              pt-14

              bg-gradient-to-t
              from-black/80
              via-black/40
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

              {/* Left */}
              <div className="flex items-center gap-1 sm:gap-2">

                <button
                  onClick={() => skip(-10)}
                  className="video-control"
                  title="Back 10 seconds"
                >
                  ↶
                  <span className="absolute text-[7px]">
                    10
                  </span>
                </button>

                <button
                  onClick={togglePlay}
                  className="video-play"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? "❚❚" : "▶"}
                </button>

                <button
                  onClick={() => skip(10)}
                  className="video-control"
                  title="Forward 10 seconds"
                >
                  ↷
                  <span className="absolute text-[7px]">
                    10
                  </span>
                </button>

              </div>

              {/* Right */}
              <div className="flex items-center gap-2 sm:gap-3">

                <button
                  onClick={toggleMute}
                  className="text-white text-base sm:text-xl hover:scale-110 transition"
                >
                  {muted ? "🔇" : "🔊"}
                </button>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={muted ? 0 : volume}
                  onChange={handleVolume}
                  className="volume-range hidden sm:block w-16"
                />

                <button
                  onClick={toggleFullscreen}
                  className="text-white text-lg sm:text-xl hover:scale-110 transition"
                  title="Fullscreen"
                >
                  ⛶
                </button>

              </div>

            </div>

          </div>

        </div>

        {/* ================= MESSAGE ================= */}

        <h1 className="
          text-2xl
          sm:text-3xl
          md:text-4xl
          font-semibold
          text-gray-700
          leading-tight
          max-w-3xl
          mb-3
          sm:mb-4
        ">
          I knew you wouldn't stay upset with me for too long 🥹💖
        </h1>

        <p className="
          text-lg
          sm:text-xl
          md:text-2xl
          text-rose-600
          mb-5
          sm:mb-6
        ">
          Now, it's all smiles and happiness ❤️
        </p>

        {/* Replay */}
        <button
          onClick={onReplay}
          className="
            px-8
            sm:px-10
            py-3
            sm:py-4
            bg-gradient-to-r
            from-purple-500
            to-pink-500
            text-white
            rounded-full
            text-lg
            sm:text-xl
            font-medium
            shadow-lg
            hover:scale-105
            active:scale-95
            transition-all
          "
        >
          Replay 🔁
        </button>

      </div>
    </div>
  );
};

export default FinalScreen;