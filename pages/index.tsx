import YstvHead from "../components/YstvHead";
import VideoCarousel from "../components/VideoCarousel/VideoCarousel";

import styles from "./index.module.css";
import GenreBox from "../components/GenreBox";
import HomePageMainBanner from "../components/HomePageMainBanner";

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
        <HomePageMainBanner />

        <div className="mediumThin center">
          <VideoCarousel
            title="Featured"
            videos={featuredVideoPageState}
            disableSeeMore
          />

          <VideoCarousel
            title="Recent"
            videos={recentVideoPageState}
            disableSeeMore
          />
        </div>

        <GenreBox videos={[genreVideoPageState]} />

        <div className="mediumThin center">
          <VideoCarousel
            title="Popular"
            videos={popularVideoPageState}
            disableSeeMore
          />
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
    `${process.env.REST_API}/v1/public/playlist/popular/all`
  )
    .then((res) => res.json())
    .then((json) => json.videos);

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
