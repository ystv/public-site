import styles from "./GenreBox.module.css";
import VideoCarousel from "../VideoCarousel/VideoCarousel";

export default function GenreBox(genreVideoPageState) {
  return (
    <div className={styles.container}>
      <div className={styles.genreSelector}>
        <h1>Entertainment</h1>
        <h1>Factual</h1>
        <h1>Scripted</h1>
        <h1>Sport</h1>
        <h1>Archives </h1>
      </div>

      <div className={styles.carouselcontainer}>
        <VideoCarousel videos={genreVideoPageState} inverted />
      </div>
    </div>
  );
}
