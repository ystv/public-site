import React, { useEffect, useRef, useState } from "react";
import videojs, { VideoJsPlayer } from "video.js";

// eslint-disable-next-line import/prefer-default-export
const usePlayer = (options, time?) => {
  const videoRef = useRef(null);
  const [player, setPlayer] = useState<VideoJsPlayer | null>(null);

  useEffect(() => {
    const vjsPlayer = videojs(videoRef.current, {
      ...options,
    });
    setPlayer(vjsPlayer);

    return () => {
      if (player !== null) {
        player.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (player !== null) {
      //console.log(player); // valid player object lives in here
      if (time !== 0) {
        player.play();
        player.currentTime(time);
      }
    }
  }, [player]);

  useEffect(() => {
    // is this needed?
    if (player !== null) {
      player.src(options.src);
    }
  }, [options.src]);

  return videoRef;
};

function VideoPlayer(options, time) {
  const playerRef = usePlayer(options, time);

  return (
    <div data-vjs-player>
      <video ref={playerRef} className="video-js" />
    </div>
  );
}

VideoPlayer.defaultProps = {
  controls: true,
  autoplay: false,
};

export default VideoPlayer;
