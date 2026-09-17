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
    const videoElement = videoRef.current;

    if (!videoElement) return;

    videoElement.play().catch(() => {
      setIsPlaying(false);
    });

    const updateProgress = () => {
      setProgress(videoElement.currentTime);
    };

    videoElement.addEventListener("timeupdate", updateProgress);

    return () => {
      videoElement.removeEventListener("timeupdate", updateProgress);
    };
  }, [video]);

  const togglePlay = () => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    if (videoElement.paused) {
      videoElement.play();
      setIsPlaying(true);
    } else {
      videoElement.pause();
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
    const videoElement = videoRef.current;

    if (!videoElement) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoElement.requestFullscreen();
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="frame-page">

      {/* Decorative background */}
      <div className="absolute -top-32 -left-32 w-72 h-72 sm:w-96 sm:h-96 bg-pink-300 rounded-full blur-3xl opacity-40" />

      <div className="absolute -bottom-32 -right-32 w-72 h-72 sm:w-96 sm:h-96 bg-purple-300 rounded-full blur-3xl opacity-40" />

      {/* Main */}
      <div className="frame-layout">

        {/* ================= VIDEO ================= */}

        <div className="video-section">

          <div
            className="video-frame"
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
                  className="video-element"
                />

                {/* Controls */}
                <div
                  className={`
                    video-controls
                    ${
                      showControls
                        ? "video-controls-visible"
                        : "video-controls-hidden"
                    }
                  `}
                >

                  {/* Progress */}
                  <div className="video-progress-row">

                    <span>
                      {formatTime(progress)}
                    </span>

                    <input
                      type="range"
                      min="0"
                      max={duration || 0}
                      value={progress}
                      onChange={handleSeek}
                      className="video-range"
                    />

                    <span>
                      {formatTime(duration)}
                    </span>

                  </div>

                  {/* Buttons */}
                  <div className="video-buttons">

                    <div className="video-left-controls">

                      <button
                        onClick={() => skip(-10)}
                        className="video-control"
                        title="Back 10 seconds"
                      >
                        ↶
                        <span>10</span>
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
                        title="Forward 10 seconds"
                      >
                        ↷
                        <span>10</span>
                      </button>

                    </div>

                    <div className="video-right-controls">

                      <button
                        onClick={toggleMute}
                        className="video-icon"
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
                        className="volume-range"
                      />

                      <button
                        onClick={toggleFullscreen}
                        className="video-icon"
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
                className="video-element"
              />
            )}

          </div>

        </div>

        {/* ================= TEXT ================= */}

        <div className="story-card">

          {/* Scrollable text only */}
          <div className="story-scroll">

            <p className="story-text">
              {text}
            </p>

          </div>

          {/* Fixed button */}
          <div className="next-container">

            <button
              onClick={onNext}
              className="next-button"
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