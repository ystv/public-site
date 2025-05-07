import { removeHTMLTags } from "../commonFunctions";
import { SyntheticEvent } from "react";
import Image from "next/image";
import styles from "./index.module.css";
import { Channel } from "../../pages/watch/live/[liveURLName]";

interface Props {
  video: Channel;
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
      style={{
        color: inverted ? "var(--light)" : "black",
        margin: "10px 5px 10px 5px",
      }}
    >
      <div className={styles.cell}>
        <a href={"/watch/live/" + e.urlName}>
          <div className={styles.imageContainer}>
            <Image
              src={e.thumbnail || "/ystv_primary_logo_small_new.png"}
              height="180"
              width="320"
              unoptimized
              onError={(e: SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/ystv_primary_logo_small_new.png";
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
