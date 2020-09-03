import YstvHead from "../components/YstvHead";
import VideoCarousel from "../components/VideoCarousel";
import config from "../config.json";

export default function Home({ recentVideoPageState, oldVideoPageState }) {
  return (
    <>
      <YstvHead />
      <main>
        <VideoCarousel title="Recent Videos" videos={recentVideoPageState} />

        <VideoCarousel title="Old Videos" videos={oldVideoPageState} />
      </main>
    </>
  );
}

export async function getServerSideProps() {
  try {
    let recentVideoPageState = await fetch(
      `${config.REST_API}/v1/public/videos/50/0`
    ).then((res) => res.json());

    let oldVideoPageState = await fetch(
      `${config.REST_API}/v1/public/videos/50/1000`
    ).then((res) => res.json());
    return { props: { recentVideoPageState, oldVideoPageState } };
  } catch {
    return { props: { res: { videos: [] } } };
  }
}
