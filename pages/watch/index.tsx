import YstvHead from "../../components/YstvHead";
import VideoCarousel from "../../components/VideoCarousel/VideoCarousel";
import config from "../../config.json";

export default function Watch({ recentVideoPageState, oldVideoPageState }) {
  return (
    <>
      <YstvHead />
      <h1>Watch</h1>

      <VideoCarousel videos={recentVideoPageState} detail />

      <VideoCarousel videos={oldVideoPageState} detail />
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

// TODO //
// Add multiple video genres and orderings
// Navigating between pages + useState
