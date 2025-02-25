import { formatTime, removeHTMLTags } from "../commonFunctions";
import { SyntheticEvent } from "react";
import Image from "next/image";
import styles from "./VideoCell.module.css";

interface Props {
  video: {
    id;
    seriesID;
    name;
    url;
    description;
    thumbnail;
    broadcastDate;
    views;
    duration;
  };
  detail?: boolean;
  inverted?: boolean;
}

interface eventTargetInterfaceImg {
  target: {
    onerror;
    src;
  };
}

export default function VideoCell({
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
        <a href={"/watch/video/" + e.id}>
          <div className={styles.imageContainer}>
            <Image
              src={
                e.thumbnail
                  ? e.thumbnail
                  : `https://ystv.co.uk/static/images/videos/thumbnails/0${e.id}.jpg`
              }
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
            <small className={styles.duration}>{formatTime(e.duration)}</small>
          </div>
          <h3
            className={styles.title}
            style={{ color: inverted ? "var(--light)" : "black" }}
          >
            {e.name}
          </h3>
        </a>
        <span>
          <h5>
            {e.views} View{e.views !== 1 ? "s" : null}
          </h5>
          <h5 className={styles.date}>
            {
              // en-GB ensures the date (the only part we care about has the month and day in the right order)
              new Date(e.broadcastDate).toLocaleString("en-GB").split(",")[0]
            }
          </h5>
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
