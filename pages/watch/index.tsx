import YstvHead from "../../components/YstvHead";
import VideoCarousel from "../../components/VideoCarousel/VideoCarousel";
import config from "../../config.json";

export default function Watch({ recentVideoPageState, oldVideoPageState }) {
  return (
    <>
      <div style={{ paddingLeft: "10%" }}>
        <YstvHead />
        <h1>Watch</h1>
      </div>
      <VideoCarousel title="Popular" videos={recentVideoPageState} detail />

      <VideoCarousel title="Featured" videos={recentVideoPageState} detail />

      <VideoCarousel title="Recent" videos={recentVideoPageState} detail />

      <VideoCarousel
        title="Entertainment"
        videos={recentVideoPageState}
        detail
      />

      <VideoCarousel title="Factual" videos={recentVideoPageState} detail />

      <VideoCarousel title="Scripted" videos={recentVideoPageState} detail />

      <VideoCarousel title="Sport" videos={recentVideoPageState} detail />

      <VideoCarousel title="Archives" videos={recentVideoPageState} detail />

      <VideoCarousel
        title="Something Random"
        videos={recentVideoPageState}
        detail
      />
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
