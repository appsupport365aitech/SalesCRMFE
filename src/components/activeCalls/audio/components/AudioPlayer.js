import { useRef, useState } from "react";
import { tracks } from "./tracks";

// import components
import DisplayTrack from "./DisplayTrack";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import TopBar from "./TopBar";
import { getBasicIcon } from "@/utils/AssetsHelper";
import Image from "next/image";

const AudioPlayer = ({ src }) => {
  // states
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);
  const [speed, setSpeed] = useState(1);
  // reference
  console.log(duration, "arijit");
  const audioRef = useRef();
  const progressBarRef = useRef();

  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    }
  };

  return (
    <>
      <div className="audio-player relative w-[100%] bg-white rounded-xl min-h-[160px] flex flex-col justify-center">
        <div className="inner w-[100%]">
          <div className="flex justify-between">
            <p className="text-[14px] pt-[10px] mb-[15px] font-medium tracking-wide text-[#000]">
              Call Player
            </p>
            <div className="flex items-center gap-6">
              <h4 className="text-gray-600">Speed {speed}X : </h4>
              <div className="volume ">
                {/* <button onClick={() => setMuteVolume((prev) => !prev)}>
                  <Image
                    src={getBasicIcon("volume_gray")}
                    style={{
                      zIndex: 10,
                    }}
                    alt=""
                    width={13}
                    height={13}
                    className="mr-[9px] cursor-pointer"
                  />
                </button> */}
                <input
                  type="range"
                  className="diff"
                  min={0.5}
                  max={2}
                  step={0.5}
                  value={speed}
                  style={{
                    background: `linear-gradient(to right, #909193  ${
                      0 * 100
                    }%, #ccc ${0 * 100}%)`,
                  }}
                  onChange={(e) => setSpeed(e.target.value)}
                />
              </div>
            </div>
          </div>
          <ProgressBar
            {...{ progressBarRef, audioRef, timeProgress, duration }}
          />
          <Controls
            {...{
              audioRef,
              progressBarRef,
              duration,
              setTimeProgress,
              tracks,
              trackIndex,
              timeProgress,
              setTrackIndex,
              setCurrentTrack,
              handleNext,
            }}
          />
          <DisplayTrack
            {...{
              src,
              currentTrack,
              audioRef,
              setDuration,
              progressBarRef,
              handleNext,
              speed,
            }}
          />
        </div>
      </div>
    </>
  );
};
export default AudioPlayer;
