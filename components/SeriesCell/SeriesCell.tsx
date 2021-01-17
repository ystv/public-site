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
            <img
              src={`https://ystv.co.uk/static/images/shows/${e.thumbnail}`}
              className={styles.thumbnail}
              onError={(e: SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://ystv.co.uk/static/images/logos/YSTV_meta.jpg";
                e.target;
              }}
            />
            {/* <Image
              src={`https://ystv.co.uk/static/images/shows/${e.thumbnail}`}
              height="180"
              width="320"
              unoptimized
              onError={(e: SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://ystv.co.uk/static/images/logos/YSTV_meta.jpg";
                e.target;
              }}
            /> */}
          </div>

          <h3 className={styles.title}>{e.name}</h3>
        </a>
        <p className={styles.description}>{e.description}</p>
      </div>
    </div>
  );
}
