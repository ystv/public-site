import YstvHead from "../components/YstvHead";
import VideoCarousel from "../components/VideoCarousel/VideoCarousel";
import config from "../config.json";

import styles from "./index.module.css";
import GenreBox from "../components/GenreBox/Genrebox";

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
          <picture>
            <source srcSet="/site-images/carousel.webp" type="image/webp" />
            <source srcSet="/site-images/carousel.jpg" type="image/jpeg" />
            <img src="/site-images/carousel.jpg" />
          </picture>

          <div className={styles.bannerFilter}>
            <div className={styles.bannerContents}>
              <h1>We are York Student Television.</h1>
              <h3>NaSTA Best Broadcaster and Best Tech 2019</h3>
              <button className={styles.aboutButton}>About Us</button>
              <button className={styles.highlightsButton}>Highlights</button>
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

        <div className={styles.homethin}>
          <VideoCarousel title="Featured" videos={featuredVideoPageState} />
        </div>

        <div className={styles.homethin}>
          <VideoCarousel title="Recent" videos={recentVideoPageState} />
        </div>

        <GenreBox videos={[genreVideoPageState]} />

        <div className={styles.homethin}>
          <VideoCarousel title="Popular" videos={popularVideoPageState} />
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  try {
    let recentVideoPageState = await fetch(
      `${config.api.rest}/v1/public/videos/12/0`
    ).then((res) => res.json());

    let popularVideoPageState = await fetch(
      `${config.api.rest}/v1/public/videos/12/1000`
    ).then((res) => res.json());

    let genreVideoPageState = await fetch(
      `${config.api.rest}/v1/public/videos/12/500`
    ).then((res) => res.json());

    let featuredVideoPageState = await fetch(
      `${config.api.rest}/v1/public/videos/12/600`
    ).then((res) => res.json());

    return {
      props: {
        recentVideoPageState,
        popularVideoPageState,
        featuredVideoPageState,
        genreVideoPageState,
      },
    };
  } catch {
    return { props: { res: { videos: [] } } };
  }
}
