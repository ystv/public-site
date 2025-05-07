import YstvHead from "../components/YstvHead";
import VideoCarousel from "../components/VideoCarousel/VideoCarousel";

import styles from "./index.module.css";
import GenreBox from "../components/GenreBox";
import HomePageMainBanner from "../components/HomePageMainBanner";
import HomeLiveBanner from "../components/HomeLiveBanner";
import { SWRConfig } from "swr";
import { Channel } from "./watch/live/[liveURLName]";
import { VideoItem, VideoMeta } from "../types/api/Video";
import { Playlist } from "../types/api/Playlist";

export default function Home({
  recentVideoPageState,
  popularVideoPageState,
  featuredVideoPageState,
  genreVideoPageState,
  liveFallback,
}) {
  return (
    <>
      <YstvHead />
      <main>
        <SWRConfig value={{ fallback: liveFallback }}>
          <HomeLiveBanner />
        </SWRConfig>
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
  let recentVideoPageState: VideoMeta[] = await fetch(
    `${process.env.REST_API}/v1/public/videos/12/0`,
  ).then((res) => res.json());

  let popularVideoPageState: VideoItem[] = await fetch(
    `${process.env.REST_API}/v1/public/playlist/popular/all`,
  )
    .then((res): Promise<Playlist> => res.json())
    .then((json): VideoItem[] => json.videos);

  let genreVideoPageState: VideoMeta[] = await fetch(
    `${process.env.REST_API}/v1/public/videos/12/500`,
  ).then((res) => res.json());

  let featuredVideoPageState: VideoMeta[] = await fetch(
    `${process.env.REST_API}/v1/public/videos/12/600`,
  ).then((res) => res.json());

  let liveFallback = await fetch(
    `${process.env.REST_API}/v1/public/playout/channels`,
  )
    .then((res): Promise<Channel[]> => res.json())
    .then((e: Channel[]) => {
      let keyedData = {};
      keyedData[`${process.env.REST_API}/v1/public/playout/channels`] =
        e as Channel[];
      return keyedData;
    });

  return {
    props: {
      recentVideoPageState,
      popularVideoPageState,
      featuredVideoPageState,
      genreVideoPageState,
      liveFallback,
    },
  };
}
