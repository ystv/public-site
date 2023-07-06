import { removeHTMLTags } from "../commonFunctions";
import { SyntheticEvent } from "react";
import Image from "next/legacy/image";
import styles from "./index.module.css";
import { channel } from "../../pages/watch/live/[liveURLName]";

interface Props {
  video: channel;
  detail?: boolean;
  inverted?: boolean;
}

export default function LiveVideoCell({
  video,
  detail = false,
  inverted = false,
}: Props) {
  let e = video;

  return (
    <div
      className={styles.flexContainer}
      style={{ color: inverted ? "var(--light)" : "black" }}
    >
      <div className={styles.cell}>
        <a href={"/watch/live/" + e.urlName}>
          <div className={styles.imageContainer}>
            <Image
              src={e.thumbnail || "/ystv_primary_logo_small.jpg"}
              height="180"
              width="320"
              unoptimized
              onError={(e: SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/ystv_primary_logo_small.jpg";
                e.target;
              }}
              className={styles.thumbnail}
              alt=""
            />
            {/*<small className={styles.duration}>{formatTime(e.duration)}</small>*/}
          </div>
          <h3
            className={styles.title}
            style={{ color: inverted ? "var(--light)" : "black" }}
          >
            {e.name}
          </h3>
        </a>
        <span>
          <h5>Live from {e.location}</h5>
          {/*<h5>*/}
          {/*  {e.views} View{e.views !== 1 ? "s" : null}*/}
          {/*</h5>*/}
          {/*<h5 className={styles.date}>*/}
          {/*  {e.scheduledStart} - {e.scheduledEnd}*/}
          {/*</h5>*/}
        </span>
        {detail === true ? (
          <p className={styles.description}>{removeHTMLTags(e.description)}</p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
