import React from "react";
import { BsMusicNoteBeamed } from "react-icons/bs";

const DisplayTrack = ({
  currentTrack,
  audioRef,
  src,
  setDuration,
  progressBarRef,
  handleNext,
  speed = 1,
}) => {
  const onLoadedMetadata = () => {
    audioRef.current.playbackRate = speed;
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };

  React.useEffect(() => {
    onLoadedMetadata();
  });

  return (
    <div>
      <audio
        src={src}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}
      />
    </div>
  );
};
export default DisplayTrack;
