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
              src={`https://ystv.co.uk/static/images/videos/thumbnails/0${e.id}.jpg`}
              height="180"
              width="320"
              unoptimized
              onError={(e: SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://ystv.co.uk/static/images/logos/YSTV_meta.jpg";
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
            {new Date(e.broadcastDate).toLocaleString().split(",")[0]}
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
