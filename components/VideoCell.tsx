import { formatTime, removeHTMLTags } from "./commonFunctions";
import { SyntheticEvent } from "react";
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
}

interface eventTargetInterfaceImg {
  target: {
    onerror;
    src;
  };
}

export default function VideoCell({ video, detail = false }: Props) {
  let e = video;

  return (
    <div className={styles.flexContainer}>
      <div className={styles.cell}>
        <a href={"/watch/video/" + e.id}>
          <div className={styles.imageContainer}>
            <img
              src={`https://ystv.co.uk/static/images/videos/thumbnails/0${e.id}.jpg`}
              height="100"
              onError={(e: SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://ystv.co.uk/static/images/logos/YSTV_meta.jpg";
                e.target;
              }}
              className={styles.thumbnail}
            />
            <small className={styles.duration}>{formatTime(e.duration)}</small>
          </div>
          <h3 className={styles.title}>{e.name}</h3>
        </a>
        <span>
          <h5>{e.views} Views</h5>
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
