import YstvHead from "../components/YstvHead";
import VideoCarousel from "../components/VideoCarousel/VideoCarousel";
import config from "../config.json";
import { useState } from "react";
import styles from "./index.module.css";
import GenreBox from "../components/GenreBox/Genrebox";
import Image from "next/image";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer";

export default function Home({
  recentVideoPageState,
  popularVideoPageState,
  featuredVideoPageState,
  genreVideoPageState,
  video,
}) {
  const [collapsed, setCollapsed] = useState(true);
  const videoJSOptions = {
    autoplay: false,
    playbackRates: [0.5, 1, 1.25, 1.5, 2],
    controls: true,
    fit: true,
    fluid: true,
    sources: video.files
      .filter((e) => e.mode == "watch")
      .map((e, i, t) => {
        let sel = i == t.length - 1 ? true : false; // Sets to last item in list (assumed to be highest quality)
        return {
          src: `https://ystv.co.uk/videofile${e.uri.substring(6)}`,
          type: e.mimeType,
          label: `${e.height}p`,
          selected: sel,
        };
      }),
  };
  var myplayer = VideoPlayer(videoJSOptions, 0);
  return (
    <>
      <YstvHead />
      <main>
        <div className={styles.banneri}>
          <Image
            src="/site-images/carousel.jpg"
            layout="fill"
            priority
            objectFit={"cover"}
          />

          <div className={styles.bannerFilter}>
            <div className={styles.bannerContents}>
              <h1>We are York Student Television.</h1>
              <h3>NaSTA Best Broadcaster and Best Tech 2019</h3>
              <button
                className={styles.aboutButton}
                onClick={() => {
                  window.location.href = "/about";
                }}
              >
                About Us
              </button>
              <button
                className={styles.highlightsButton}
                onClick={() => setCollapsed(!collapsed)}
              >
                Highlights
              </button>
            </div>

            <div
              className={`${styles.collapsodiv} ${
                collapsed ? styles.collapsodivcollapsed : ""
              }`}
            >
              <button
                className={styles.aboutButton}
                onClick={() => setCollapsed(!collapsed)}
              >
                X
              </button>
              {myplayer}
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

    let video = await fetch(`${config.api.rest}/v1/public/video/3411`).then(
      (res) => {
        return res.json();
      }
    );

    return {
      props: {
        recentVideoPageState,
        popularVideoPageState,
        featuredVideoPageState,
        genreVideoPageState,
        video,
      },
    };
  } catch {
    return { props: { res: { videos: [] } } };
  }
}
