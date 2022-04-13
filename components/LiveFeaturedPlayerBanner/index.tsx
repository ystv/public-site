import styles from "./index.module.css";
import { channel } from "../../pages/watch/live/[liveURLName]";
import React, { useEffect, useRef } from "react";
import VideoPlayer from "../VideoPlayer";

const LiveModal = ({ channel }: { channel: channel }) => {
  const videoJSOptions = {
    autoplay: false,
    playbackRates: [0.5, 1, 1.25, 1.5, 2],
    height: 500,
    controls: true,
    liveui: true,
    fluid: true,
    poster: channel.thumbnail,
    sources: [
      {
        src: channel.outputURL,
        type: "application/x-mpegURL",
      },
    ],
  };

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
            width: "100%",
          }}
        >
          <VideoPlayer options={videoJSOptions} time={0} />
          <br />
        </div>
        <div style={{ flex: 1 }}>
          {/*<div>Channel 1</div>*/}
          <h2 style={{ margin: 0 }}>{channel.name}</h2>
          <small>
            {new Date(channel.scheduledStart).toLocaleTimeString("en-GB", {
              timeStyle: "short",
            })}
            {" - "}
            {new Date(channel.scheduledEnd).toLocaleTimeString("en-GB", {
              timeStyle: "short",
            })}
          </small>
          <h5>Live from {channel.location}</h5>
          <p>{channel.description}</p>
        </div>
      </div>
    </div>
  );
};

export default LiveModal;
