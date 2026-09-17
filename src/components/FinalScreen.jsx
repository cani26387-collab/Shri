import { useEffect, useRef, useState } from "react";
import celebrationVideo from "../assets/images/shri4.mp4";

const FinalScreen = ({ onReplay }) => {
  const videoRef = useRef(null);

  const [show, setShow] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    setTimeout(() => setShow(true), 200);

    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
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

  const toggleMute = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  const seek = (e) => {
    const value = Number(e.target.value);

    if (!videoRef.current) return;

    videoRef.current.currentTime = value;
    setProgress(value);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="final-page">

      <div
        className={`
          final-card
          ${show ? "final-visible" : "final-hidden"}
        `}
      >

        {/* Video */}
        <div className="final-video">

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
            onTimeUpdate={() => {
              if (videoRef.current) {
                setProgress(videoRef.current.currentTime);
              }
            }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onClick={togglePlay}
          />

          <div className="final-video-controls">

            <div className="video-progress-row">

              <span>{formatTime(progress)}</span>

              <input
                type="range"
                min="0"
                max={duration || 0}
                value={progress}
                onChange={seek}
                className="video-range"
              />

              <span>{formatTime(duration)}</span>

            </div>

            <div className="final-control-buttons">

              <button
                onClick={togglePlay}
                className="video-play"
              >
                {isPlaying ? "❚❚" : "▶"}
              </button>

              <button
                onClick={toggleMute}
                className="video-icon"
              >
                {muted ? "🔇" : "🔊"}
              </button>

            </div>

          </div>

        </div>

        <h1 className="final-title">
          I knew you wouldn't stay upset with me for too long 🥹💖
        </h1>

        <p className="final-subtitle">
          Now, it's all smiles and happiness 🎉❤️
        </p>

        <button
          onClick={onReplay}
          className="replay-button"
        >
          Replay 🔁
        </button>

      </div>

    </div>
  );
};

export default FinalScreen;