export default function WatchPlaylist() {
  return <div>HERE IS A PLAYLIST</div>;
}

//export async function getServerSideProps(context) {
//  try {
//    var res = await fetch(
//      `${process.env.REST_API}/v1/public/video/${context.query.videoid}`
//    ).then((res) => res.json());
//    return { props: { video: res } };
//  } catch {
//    return { props: { video: { videos: [] } } };
//  }
//}

// TODO //
// Add proper video player
// Track selection and assignment based on quality
