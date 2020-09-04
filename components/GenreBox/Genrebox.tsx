import styles from "./GenreBox.module.css";
import VideoCarousel from "../VideoCarousel";

export default function GenreBox(genreVideoPageState) {
  return (
    <div className={styles.container}>
      <h1>Entertainment</h1>
      <div className={styles.carouselcontainer}>
        <VideoCarousel videos={genreVideoPageState} />
      </div>
    </div>
  );
}
