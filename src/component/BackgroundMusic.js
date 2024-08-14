import { useRef } from "react";

const BackgroundMusic = ({ onPlay }) => {
  const audioRef = useRef(null);

  const handlePlay = () => {
    audioRef.current.play();
    onPlay();
  };

  return (
    <div className="start-button">
      <audio ref={audioRef} src="/sounds/bgm.mp3" loop />;
      <button onClick={handlePlay}>Game Start</button>
    </div>
  );
};

export default BackgroundMusic;
