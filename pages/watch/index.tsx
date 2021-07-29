import YstvHead from "../../components/YstvHead";
import VideoCarousel from "../../components/VideoCarousel/VideoCarousel";

export default function Watch({ recentVideoPageState, oldVideoPageState }) {
  return (
    <div className="thin center">
      <YstvHead />
      <h1>Watch</h1>
      <VideoCarousel title="Popular" videos={recentVideoPageState} detail />

      <VideoCarousel title="Featured" videos={oldVideoPageState} detail />

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
    </div>
  );
}

export async function getServerSideProps() {
  try {
    let recentVideoPageState = await fetch(
      `${process.env.REST_API}/v1/public/videos/50/0`
    ).then((res) => res.json());

    let oldVideoPageState = await fetch(
      `${process.env.REST_API}/v1/public/videos/50/1000`
    ).then((res) => res.json());
    return { props: { recentVideoPageState, oldVideoPageState } };
  } catch {
    return { props: { res: { videos: [] } } };
  }
}
