import YstvHead from "../../../components/YstvHead";
import VideoPlayer from "../../../components/VideoPlayer";
import Breadcrumb from "../../../components/Breadcrumb";
import { formatTime } from "../../../components/commonFunctions";
import { useState } from "react";
import Popover from "react-popover";

import styles from "./videoid.module.css";

export default function WatchVideo({ video, time, breadcrumb }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [copyButtonText, setCopyButtonText] = useState("Copy");

  try {
    if (!video) {
      console.warn("No video data on video #", video.id);
      return VideoErrorSnippet;
    }

    if (!video.files) {
      console.warn("No files on video #", video.id);
      return VideoErrorSnippet;
    }

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
            src:
              e.uri.split("/")[0] == "legacy" // NEEDS to be replaced when API/storage migration is done, this is gross
                ? `https://ystv.co.uk/videofile${e.uri.substring(6)}`
                : `https://cdn.ystv.co.uk/${e.uri}`,
            type: e.mimeType,
            label: `${e.height}p`,
            selected: sel,
          };
        }),
    };

    const copyText = `<iframe
    src="http://ystv.co.uk/embed/${video.id}?height=360"
    width="640"
    height="360"
    frameborder="0"
    allowfullscreen
    scrolling="no"
    ></iframe>`;

    const popoverProps = {
      isOpen: isPopoverOpen,
      onOuterAction: () => setIsPopoverOpen(false),
      body: (
        <div className={styles.popover}>
          <h1 key="a">Embed this video on your site:</h1>
          <div
            style={{ border: "solid", padding: "1rem", borderRadius: "1rem" }}
            key="c"
          >
            {copyText}
          </div>
          <br />
          <button
            className={styles.embedButton}
            key="b"
            onClick={() => {
              navigator.clipboard.writeText(copyText).then(
                function () {
                  console.log("Async: Copying to clipboard was successful!");
                  setCopyButtonText("Copied");
                },
                function (err) {
                  console.error("Async: Could not copy text: ", err);
                }
              );
            }}
          >
            {copyButtonText}
          </button>
        </div>
      ),
    };

    return (
      <>
        <YstvHead title={`Watch - ${video.name}`} />
        <div className="center thin">
          <Breadcrumb breadcrumb={breadcrumb} />
          <h1>{video.name}</h1>
          <VideoPlayer options={videoJSOptions} time={time} />
          <div className={styles.videoInfo}>
            <p
              dangerouslySetInnerHTML={{ __html: video.description }}
              style={{ flex: 1 }}
            />
            <div className={styles.spacer} />
            <div className={styles.rightInfo}>
              <h4>
                {video.views} View{video.views !== 1 ? "s" : null}
              </h4>
              <h5>Duration: {formatTime(video.duration)}</h5>
              <h5>
                Published{" "}
                {new Date(video.broadcastDate).toLocaleString().split(",")[0]}
              </h5>
              {/*<button*/}
              {/*  className={styles.embedButton}*/}
              {/*  onClick={() => setIsPopoverOpen(true)}*/}
              {/*>*/}
              {/*  Embed*/}
              {/*</button>*/}
            </div>
          </div>
        </div>
        {/*<Popover {...popoverProps}>*/}
        {/*  <div />*/}
        {/*  /!* Needs to be there coz reasons...? *!/*/}
        {/*</Popover>*/}
      </>
    );
  } catch (e) {
    console.log(e);
    return VideoErrorSnippet;
  }
}

const VideoErrorSnippet = (
  <div className="center thin">
    <h1>Sorry! Video Could Not Be Loaded</h1>
  </div>
);

export async function getServerSideProps(context) {
  let time: number = 0;
  if (context.query.time !== undefined) {
    time = context.query.time;
  }
  try {
    let video = await fetch(
      `${process.env.REST_API}/v1/public/video/${context.query.videoid}`
    ).then((res) => {
      if (!res.ok) {
        context.res.statusCode = 302;
        context.res.setHeader("Location", `/404`);
      } else {
        return res.json();
      }
    });
    let breadcrumb: [] = await fetch(
      `${process.env.REST_API}/v1/public/video/${context.query.videoid}/breadcrumb`
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
