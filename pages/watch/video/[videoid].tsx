import * as RadixPopover from "@radix-ui/react-popover";
import YstvHead from "../../../components/YstvHead";
import VideoPlayer from "../../../components/VideoPlayer";
import Breadcrumb from "../../../components/Breadcrumb";
import { formatTime } from "../../../components/commonFunctions";
import { useState } from "react";

import styles from "./videoid.module.css";
import { IBreadcrumb, VideoItem } from "../../../types/api/Video";

export default function WatchVideo({ video, time, breadcrumb }) {
  const [copyButtonText, setCopyButtonText] = useState("Copy");

  try {
    if (!video || !video.files) {
      console.warn("Video data or files missing.");
      return VideoErrorSnippet;
    }

    const videoJSOptions = {
      autoplay: false,
      playbackRates: [0.5, 1, 1.25, 1.5, 2],
      controls: true,
      fill: true,
      fluid: true,
      sources: video.files
        .filter((e) => e.mode === "watch")
        .map((e, i, t) => {
          const sel = i === t.length - 1;
          return {
            src:
              e.uri.split("/")[0] === "legacy"
                ? `https://ystv.co.uk/videofile${e.uri.substring(6)}`
                : `https://cdn.ystv.co.uk/${e.uri}`,
            type: e.mimeType,
            label: `${e.height}p`,
            selected: sel,
          };
        }),
    };

    const copyText = `<iframe
        src="https://ystv.co.uk/embed/${video.id}?height=360"
        width="640"
        height="360"
        frameborder="0"
        allowfullscreen
        scrolling="no"
        ></iframe>`;

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
                {new Date(video.broadcastDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </h5>

              {/* RADIX POPOVER INTEGRATION */}
              <RadixPopover.Root>
                <RadixPopover.Trigger asChild>
                  <button className={styles.embedButton}>Embed</button>
                </RadixPopover.Trigger>
                <RadixPopover.Portal>
                  <RadixPopover.Content
                    className={styles.popover}
                    sideOffset={8}
                  >
                    <h1>Embed this video on your site:</h1>
                    <div
                      style={{
                        border: "solid",
                        padding: "1rem",
                        borderRadius: "1rem",
                        marginTop: "0.5rem",
                      }}
                    >
                      {copyText}
                    </div>
                    <br />
                    <button
                      className={styles.embedButton}
                      onClick={() => {
                        navigator.clipboard.writeText(copyText).then(
                          () => setCopyButtonText("Copied"),
                          (err) =>
                            console.error("Async: Could not copy text: ", err),
                        );
                      }}
                    >
                      {copyButtonText}
                    </button>
                    <RadixPopover.Arrow className={styles.popoverArrow} />
                  </RadixPopover.Content>
                </RadixPopover.Portal>
              </RadixPopover.Root>
            </div>
          </div>
        </div>
      </>
    );
  } catch (e) {
    console.error(e);
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
    let video: VideoItem | undefined = await fetch(
      `${process.env.REST_API}/v1/public/video/${context.query.videoid}`,
    ).then((res): Promise<VideoItem> | undefined => {
      if (!res.ok) {
        context.res.statusCode = 302;
        context.res.setHeader("Location", `/404`);
      } else {
        return res.json();
      }
    });
    let breadcrumb: IBreadcrumb[] | undefined = await fetch(
      `${process.env.REST_API}/v1/public/video/${context.query.videoid}/breadcrumb`,
    ).then((res): Promise<IBreadcrumb[]> | undefined => {
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
