import React, { useEffect, useRef, useState } from "react";
import videojs, { VideoJsPlayer } from "video.js";

const usePlayer = (options, time?, titleOverlay?) => {
  const videoRef = useRef(null);
  const [player, setPlayer] = useState<VideoJsPlayer | null>(null);

  useEffect(() => {
    require("@silvermine/videojs-quality-selector")(videojs);
    require("videojs-contrib-quality-levels");
    require("videojs-hls-quality-selector");
    require("videojs-titleoverlay");
    let vjsPlayer = videojs(videoRef.current, {
      controlBar: {
        children: [
          "playToggle",
          "volumePanel",
          "currentTimeDisplay",
          "timeDivider",
          "durationDisplay",
          "progressControl",
          "liveDisplay",
          "seekToLive",
          "remainingTimeDisplay",
          "customControlSpacer",
          "playbackRateMenuButton",
          "chaptersButton",
          "descriptionsButton",
          "subsCapsButton",
          //"audioTrackButton",
          "pictureInPictureToggle",
          "QualitySelector",
          "fullscreenToggle",
        ],
      },
      ...options,
    });

    vjsPlayer.hlsQualitySelector({
      displayCurrentQuality: true,
    });

    if (titleOverlay !== undefined) {
      vjsPlayer.titleoverlay({
        title: `YSTV: ${titleOverlay}`, //Title for movie
        floatPosition: "left", //Float left or right (to prevent big play button overlap) (default left)
        fontSize: "1.5em", //font size (default 1em)
      });
    }

    // Add settings icon to VOD quality selector
    vjsPlayer
      .getChild("ControlBar")
      .getChild("QualitySelector")
      .getChild("QualitySelector")
      .el()
      .getElementsByClassName("vjs-icon-placeholder")
      .item(0).className = "vjs-icon-placeholder vjs-icon-cog";

    setPlayer(vjsPlayer);

    return () => {
      if (player !== null) {
        player.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (player !== null) {
      player.qualityLevels(); // Needed for HLS quality selector
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

function VideoPlayer(options, time, titleOverlay?) {
  const playerRef = usePlayer(options, time, titleOverlay);

  return (
    <div data-vjs-player>
      <video ref={playerRef} className="video-js" />
    </div>
  );
}

export default VideoPlayer;
