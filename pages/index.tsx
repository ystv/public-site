import YstvHead from "../components/YstvHead";
import VideoCarousel from "../components/VideoCarousel/VideoCarousel";
import config from "../config.json";

import styles from "./index.module.css";
import GenreBox from "../components/GenreBox/Genrebox";

export default function Home({
  recentVideoPageState,
  oldVideoPageState,
  genreVideoPageState,
}) {
  return (
    <>
      <YstvHead />
      <main>
        <div className={styles.banner}>
          <div className={styles.bannerFilter}>
            <div className={styles.bannerContents}>
              <h1>We are York Student Television.</h1>
              <h3>NaSTA Best Broadcaster and Best Tech 2019</h3>
              <button className={styles.aboutButton}>About Us</button>
              <button className={styles.highlightsButton}>Highlights</button>
            </div>
          </div>
        </div>

        <div className={styles.homethin}>
          <br />
          <VideoCarousel title="Recent Videos" videos={recentVideoPageState} />
          <br />
          <br />
          <VideoCarousel title="Old Videos" videos={oldVideoPageState} />
          <br />
        </div>

        {GenreBox(genreVideoPageState)}
      </main>
    </>
  );
}

export async function getServerSideProps() {
  try {
    let recentVideoPageState = await fetch(
      `${config.api.rest}/v1/public/videos/50/0`
    ).then((res) => res.json());

    let oldVideoPageState = await fetch(
      `${config.api.rest}/v1/public/videos/50/1000`
    ).then((res) => res.json());

    let genreVideoPageState = await fetch(
      `${config.api.rest}/v1/public/videos/50/500`
    ).then((res) => res.json());

    return {
      props: { recentVideoPageState, oldVideoPageState, genreVideoPageState },
    };
  } catch {
    return { props: { res: { videos: [] } } };
  }
}
