import YstvHead from "../components/YstvHead";
import VideoCarousel from "../components/VideoCarousel/VideoCarousel";

import styles from "./index.module.css";
import GenreBox from "../components/GenreBox/Genrebox";
import Image from "next/image";
import carouselBG from "../public/site-images/carousel.jpg";
import Button from "../components/Button/Button";

export default function Home({
  recentVideoPageState,
  popularVideoPageState,
  featuredVideoPageState,
  genreVideoPageState,
}) {
  return (
    <>
      <YstvHead />
      <main>
        <div className={styles.banneri}>
          <Image
            src={carouselBG}
            layout="fill"
            priority
            objectFit="cover"
            placeholder="blur"
            alt=""
          />
          <div className={styles.bannerFilter}>
            <div className={styles.bannerContents}>
              <h1>We are York Student Television.</h1>
              <h3>NaSTA Best Broadcaster and Best Tech 2019</h3>
              <Button label="About Us" />
              <Button label="Highlights" outline />
              {/* <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/3F076oLy_Lo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              /> */}
            </div>
          </div>
        </div>

        <div className={styles.homeThin}>
          <VideoCarousel title="Featured" videos={featuredVideoPageState} />
        </div>

        <div className={styles.homeThin}>
          <VideoCarousel title="Recent" videos={recentVideoPageState} />
        </div>

        <GenreBox videos={[genreVideoPageState]} />

        <div className={styles.homeThin}>
          <VideoCarousel title="Popular" videos={popularVideoPageState} />
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  let recentVideoPageState = await fetch(
    `${process.env.REST_API}/v1/public/videos/12/0`
  ).then((res) => res.json());

  let popularVideoPageState = await fetch(
    `${process.env.REST_API}/v1/public/videos/12/1000`
  ).then((res) => res.json());

  let genreVideoPageState = await fetch(
    `${process.env.REST_API}/v1/public/videos/12/500`
  ).then((res) => res.json());

  let featuredVideoPageState = await fetch(
    `${process.env.REST_API}/v1/public/videos/12/600`
  ).then((res) => res.json());

  return {
    props: {
      recentVideoPageState,
      popularVideoPageState,
      featuredVideoPageState,
      genreVideoPageState,
    },
  };
}
