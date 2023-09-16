import VideoCell from "../VideoCell/VideoCell";
import { createRef, useRef } from "react";

import styles from "./VideoCarousel.module.css";

interface CarouselProps {
  videos: [];
  detail?: boolean;
  title?: string;
  inverted?: boolean;
  disableSeeMore?: boolean;
  seeMoreLink?: string;
}

export default function VideoCarousel({
  videos,
  detail,
  title,
  inverted,
  disableSeeMore,
  seeMoreLink,
}: CarouselProps) {
  const scrollerCarousel = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.container}>
      {title !== undefined ? (
        <h2 style={{ margin: "1rem 0 0 1rem" }}>{title}</h2>
      ) : (
        <></>
      )}
      {!videos || videos.length == 0 || videos.length == undefined ? (
        <h3>Couldn&apos;t fetch data</h3>
      ) : (
        <div className={styles.flexContainer}>
          <button
            onClick={() => {
              scrollerCarousel.current!.scrollLeft -= 400;
            }}
            className={`${styles.round} ${inverted ? styles.inv : ""}`}
            style={{ marginRight: ".25rem" }}
          >
            <i
              className={`${styles.arrow} ${styles.left} ${
                inverted ? styles.inv : ""
              }`}
            />
          </button>
          <div className={styles.scrollerCarousel} ref={scrollerCarousel}>
            {videos.map((e, i) => (
              <div className={styles.child} key={i}>
                <VideoCell
                  video={e}
                  key={i}
                  detail={detail}
                  inverted={inverted}
                />
              </div>
            ))}
          </div>
          {/*<div className={styles.fader} />*/}
          <button
            onClick={() => {
              scrollerCarousel.current!.scrollLeft += 400;
            }}
            className={`${styles.round} ${inverted ? styles.inv : ""}`}
            style={{ marginLeft: ".25rem" }}
          >
            <i
              className={`${styles.arrow} ${styles.right} ${
                inverted ? styles.inv : ""
              }`}
            />
          </button>
        </div>
      )}
      {!disableSeeMore && (
        <div style={{ width: "100%", textAlign: "right" }}>
          <a
            href={seeMoreLink}
            className={`${inverted ? styles.inv : ""} ${styles.seeMore}`}
          >
            See More
          </a>
        </div>
      )}
      <br />
    </div>
  );
}
