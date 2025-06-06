import { useEffect, useRef } from "react";
import videojs, { VideoJsPlayer } from "video.js";
import "video.js/dist/video-js.css";

// import overlay from "videojs-titleoverlay";

// if (titleOverlay !== undefined) {
//   (vjsPlayer as any).titleoverlay({
//     title: `YSTV: ${titleOverlay}`, //Title for movie
//     floatPosition: "left", //Float left or right (to prevent big play button overlap) (default left)
//     fontSize: "1.5em", //font size (default 1em)
//   });
// }

export const VideoJS = (props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<VideoJsPlayer | null>(null);
  const { options, onReady, time, title, iframe } = props;

  useEffect(() => {
    // make sure Video.js player is only initialised once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      if (options.liveui) {
        require("videojs-contrib-quality-levels");
        const hlsqs = require("videojs-hls-quality-selector");
        videojs.registerPlugin("hlsQualitySelector", () => hlsqs);
      } else {
        require("@silvermine/videojs-quality-selector")(videojs);
        require("@silvermine/videojs-quality-selector/dist/css/quality-selector.css");
      }

      const player = (playerRef.current = videojs(
        videoElement,
        {
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
        },
        () => {
          console.log("player is ready");

          // videojs.registerPlugin("overlay", overlay);

          if (options.liveui) {
            // player.hlsQualitySelector({
            //   displayCurrentQuality: true,
            // });
            player.qualityLevels(); // Needed for HLS quality selector
          }

          console.log("plugins added");

          if (time !== 0) {
            player.play();
            player.currentTime(time);
          }

          onReady && onReady(player);
        },
      ));
    } else {
      // you can update player here [update player through props]
    }
  }, [options, videoRef, onReady, time]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  if (iframe)
    return (
      <div className="container">
        <iframe
          className="responsive-iframe"
          src={options.sources[0].src}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js" />
    </div>
  );
};

export default VideoJS;
