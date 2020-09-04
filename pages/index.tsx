import YstvHead from "../components/YstvHead";
import VideoCarousel from "../components/VideoCarousel";
import config from "../config.json";

import styles from "./index.module.css";

export default function Home({ recentVideoPageState, oldVideoPageState }) {
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
          <VideoCarousel title="Recent Videos" videos={recentVideoPageState} />

          <VideoCarousel title="Old Videos" videos={oldVideoPageState} />
        </div>
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
    return { props: { recentVideoPageState, oldVideoPageState } };
  } catch {
    return { props: { res: { videos: [] } } };
  }
}
