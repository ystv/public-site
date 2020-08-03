import config from "../../config.json";
import YstvHead from "../../Components/YstvHead";
import VideoCell from "../../Components/VideoCell";

export default function Watch({ videos }) {
  return (
    <>
      <YstvHead />
      <h1>Watch</h1>
      {videos.map((e) => (
        <VideoCell video={e} />
      ))}
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    let page = context.query.page;
    if (page === undefined) {
      page = 0;
    }
    var res = await fetch(
      `${config.api.rest}/v1/public/videos/10/${page * 10}`
    ).then((res) => res.json());
    return { props: { videos: res } };
  } catch {
    return { props: { res: { videos: [] } } };
  }
}

// TODO //
// Add multiple video genres and orderings
// Navigating between pages + useState
