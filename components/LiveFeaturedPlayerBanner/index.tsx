import styles from "./index.module.css";
import Index from "../VideoPlayer";
import { channel } from "../../pages/watch/live/[liveURLName]";
import { useEffect, useRef } from "react";

const LiveModal = ({ channel }: { channel: channel }) => {
  const playerRef = useRef(null);

  const videoJSOptions = {
    autoplay: true,
    muted: true,
    controls: true,
    fluid: true,
    sources: [
      {
        src: channel.outputURL,
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // you can handle player events here
    player.on("waiting", () => {
      console.log("player is waiting");
    });

    player.on("dispose", () => {
      console.log("player will dispose");
    });
  };

  // const changePlayerOptions = () => {
  //   // you can update the player through the Video.js player instance
  //   if (!playerRef.current) {
  //     return;
  //   }
  //   // [update player through instance's api]
  //   playerRef.current.src([{src: 'http://ex.com/video.mp4', type: 'video/mp4'}]);
  //   playerRef.current.autoplay(false);
  // };

  return (
    <div className={styles.container}>
      <div className={styles.flexRow}>
        <div className={styles.livePulse} />
        <small>Live</small>
      </div>
      <div className={styles.innerFlex}>
        <div
          style={{
            flex: 2,
          }}
        >
          <VideoJS options={videoJSOptions} onReady={handlePlayerReady} />
          <br />
        </div>
        <div style={{ flex: 1 }}>
          <div>Channel 1</div>
          <h2 style={{ margin: 0 }}>Title of Stream</h2>
          <small>10-11pm</small>
          <h5>Live from Central Hall</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum ea
            explicabo, fugiat hic ipsa itaque laborum mollitia porro quasi quia
            quod rem repellendus repudiandae sequi voluptatum. Ad aliquid quos
            repellendus?
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveModal;

import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoJS = (props) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const { options, onReady } = props;

  useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = (playerRef.current = videojs(videoElement, options, () => {
        console.log("player is ready");
        onReady && onReady(player);
      }));
    } else {
      // you can update player here [update player through props]
      // const player = playerRef.current;
      // player.autoplay(options.autoplay);
      // player.src(options.sources);
    }
  }, [options]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );
};
