import styles from "./GenreBox.module.css";
import VideoCarousel from "../VideoCarousel/VideoCarousel";
import { useState } from "react";

interface Props {
  videos: any;
}

interface ButtonProps {
  name: string;
  id: number;
}

export default function GenreBox({ videos }: Props) {
  const genres = [
    { name: "Entertainment", videos: videos[0] },
    { name: "Factual" },
    { name: "Scripted" },
    { name: "Sport" },
    { name: "Archives" },
  ];

  const [genre, setGenre] = useState(0);

  function GenreButton({ name, id }: ButtonProps) {
    return (
      <a onClick={(e) => setGenre(id)}>
        <h1>{name}</h1>
      </a>
    );
  }

  return (
    <div className={`${styles[genres[genre].name]} ${styles.container}`}>
      <div className={styles.genreSelector}>
        {genres.map(function (e, i) {
          return <GenreButton name={e.name} id={i} />;
        })}
      </div>
      <div className={styles.carouselcontainer}>
        <VideoCarousel videos={genres[0].videos} inverted />
      </div>
    </div>
  );
}
