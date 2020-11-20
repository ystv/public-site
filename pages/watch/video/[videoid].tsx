import YstvHead from "../../../components/YstvHead";
import VideoPlayer from "../../../components//VideoPlayer/VideoPlayer";
import Breadcrumb from "../../../components/Breadcrumb";
import config from "../../../config.json";
import { formatTime } from "../../../components/commonFunctions";
import { useState } from "react";
import Popover from "react-popover";

import styles from "./videoid.module.css";

export default function WatchVideo({ video, time, breadcrumb }) {
  try {
    const videoJSOptions = {
      autoplay: false,
      playbackRates: [0.5, 1, 1.25, 1.5, 2],
      controls: true,
      fill: true,
      fluid: true,
      sources: video.files
        .filter((e) => e.mode == "watch")
        .map((e, i, t) => {
          let sel = i == t.length - 1 ? true : false; // Sets to last item in list (assumed to be highest quality)
          return {
            src: `https://ystv.co.uk/videofile${e.uri.substring(6)}`,
            type: e.mimeType,
            label: `${e.height}p`,
            selected: sel,
          };
        }),
    };

    var myplayer = VideoPlayer(videoJSOptions, time);

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const popoverProps = {
      isOpen: isPopoverOpen,
      onOuterAction: () => setIsPopoverOpen(false),
      body: (
        <div className={styles.popover}>
          <h1 key="a">Embed this video on your site:</h1>
          <div
            style={{ border: "solid", padding: "1rem", borderRadius: "1rem" }}
            key="b"
          >{`<iframe
    src="http://ystv.co.uk/embed/${video.id}?height=360"
    width="640"
    height="360"
    frameborder="0"
    allowfullscreen
    scrolling="no"
    ></iframe>`}</div>
        </div>
      ),
    };

    return (
      <>
        <YstvHead title={`Watch - ${video.name}`} />
        <div className="center thin">
          <Breadcrumb breadcrumb={breadcrumb} />
          <h1>{video.name}</h1>
          {myplayer}
          <div className={styles.videoinfo}>
            <p
              dangerouslySetInnerHTML={{ __html: video.description }}
              style={{ flex: 1 }}
            />
            <div className={styles.spacer} />
            <div className={styles.rightinfo}>
              <h4>
                {video.views} View{video.views !== 1 ? "s" : null}
              </h4>
              <h5>Duration: {formatTime(video.duration)}</h5>
              <h5>
                Published{" "}
                {new Date(video.broadcastDate).toLocaleString().split(",")[0]}
              </h5>
              <button
                className={styles.embedButton}
                onClick={() => setIsPopoverOpen(true)}
              >
                Embed
              </button>
            </div>
          </div>
        </div>
        <Popover {...popoverProps}>
          <div />
        </Popover>
      </>
    );
  } catch {
    return <div />;
  }
}

export async function getServerSideProps(context) {
  var time: number = 0;
  if (context.query.time !== undefined) {
    time = context.query.time;
  }
  try {
    let video = await fetch(
      `${config.api.rest}/v1/public/video/${context.query.videoid}`
    ).then((res) => {
      if (!res.ok) {
        context.res.statusCode = 302;
        context.res.setHeader("Location", `/404`);
      } else {
        return res.json();
      }
    });
    let breadcrumb: [] = await fetch(
      `${config.api.rest}/v1/public/video/${context.query.videoid}/breadcrumb`
    ).then((res) => {
      if (!res.ok) {
        context.res.statusCode = 302;
        context.res.setHeader("Location", `/404`);
      } else {
        return res.json();
      }
    });
    return { props: { video, time, breadcrumb } };
  } catch {
    return { props: { video: { videos: [] } } };
  }
}
