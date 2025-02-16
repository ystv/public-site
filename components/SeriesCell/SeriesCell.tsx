import { SyntheticEvent } from "react";
import Image from "next/image";
import styles from "./SeriesCell.module.css";

interface Props {
  series: {
    id;
    url;
    name;
    description;
    thumbnail;
  };
}

export default function SeriesCell({ series }: Props) {
  let e = series;

  return (
    <div className={styles.flexContainer}>
      <div className={styles.cell}>
        <a href={"/watch/series/" + e.id}>
          <div className={styles.imageContainer}>
            <Image
              src={`https://ystv.co.uk/static/images/shows/${e.thumbnail}`}
              height="180"
              width="320"
              className={styles.thumbnail}
              unoptimized
              onError={(e: SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/ystv_primary_logo_small_new.png";
                e.target;
              }}
              alt=""
            />
          </div>

          <h3 className={styles.title}>{e.name}</h3>
        </a>
        <p className={styles.description}>{e.description}</p>
      </div>
    </div>
  );
}
