import config from "../../config.json";
import YstvHead from "../../components/YstvHead";
import VideoCarousel from "../../components/VideoCarousel";

export default function Watch({
  videos,
  recentVideoPageState,
  oldVideoPageState,
}) {
  return (
    <>
      <YstvHead />
      <h1>Watch</h1>

      <VideoCarousel videos={recentVideoPageState} />

      <VideoCarousel videos={oldVideoPageState} />

      {
        //{videos.map((e) => (<VideoCell video={e} />))}
      }
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    let page = context.query.page;
    if (page === undefined) {
      page = 0;
    }
    let res = []; //await fetch(`${config.api.rest}/v1/public/videos/10/${page * 10}`).then((res) => res.json());
    let recentVideoPageState = await fetch(
      `${config.api.rest}/v1/public/videos/50/0`
    ).then((res) => res.json());

    let oldVideoPageState = await fetch(
      `${config.api.rest}/v1/public/videos/50/1000`
    ).then((res) => res.json());
    return { props: { videos: res, recentVideoPageState, oldVideoPageState } };
  } catch {
    return { props: { res: { videos: [] } } };
  }
}

// TODO //
// Add multiple video genres and orderings
// Navigating between pages + useState
