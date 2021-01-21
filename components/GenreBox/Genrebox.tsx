import styles from "./GenreBox.module.css";
import VideoCarousel from "../VideoCarousel/VideoCarousel";
import { useState } from "react";
import Image from "next/image";

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
        <h1 className={id === genre ? styles.selected : null}>{name}</h1>
      </a>
    );
  }

  return (
    <div className={styles.container}>
      <Image
        src="/site-images/IMG_3734-s.jpg"
        layout="fill"
        objectFit={"cover"}
        loading="eager"
      />
      <div className={`${styles[genres[genre].name]} ${styles.showAbove}`}>
        <div className={styles.genreSelector}>
          {genres.map(function (e, i) {
            return <GenreButton name={e.name} id={i} key={i} />;
          })}
        </div>
        <div className={styles.carouselcontainer}>
          <VideoCarousel videos={genres[0].videos} inverted />
        </div>
      </div>
    </div>
  );
}
