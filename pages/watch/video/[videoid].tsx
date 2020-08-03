import YstvHead from "../../../Components/YstvHead";
import VideoPlayer from "../../../Components/VideoPlayer";
import Breadcrumb from "../../../Components/Breadcrumb";
import config from "../../../config.json";
import {
  formatTime,
  removeHTMLTags,
} from "../../../Components/commonFunctions";

export default function WatchVideo({ video, time, breadcrumb }) {
  const videoJSOptions = {
    autoplay: false,
    playbackRates: [0.5, 1, 1.25, 1.5, 2],
    height: 500,
    controls: true,
    sources: [
      {
        src: `https://ystv.co.uk/videofile/${video.files[0].uri.slice(7)}`,
        type: "video/mp4",
      },
    ],
  };

  var myplayer = VideoPlayer(videoJSOptions, time);

  return (
    <>
      <YstvHead title={`Watch - ${video.name}`} />
      <Breadcrumb breadcrumb={breadcrumb} />
      <h1>{video.name}</h1>
      {myplayer}
      <h5>{video.views} Views</h5>
      <h5>Duration: {formatTime(video.duration)}</h5>
      <h5>
        Published {new Date(video.broadcastDate).toLocaleString().split(",")[0]}
      </h5>
      <h4 dangerouslySetInnerHTML={{ __html: video.description }}></h4>
      {JSON.stringify(video)}
    </>
  );
}

export async function getServerSideProps(context) {
  var time: number = 0;
  if (context.query.time !== undefined) {
    time = context.query.time;
  }
  try {
    let video = await fetch(
      `${config.api.rest}/v1/public/video/${context.query.videoid}`
    ).then((res) => {
      if (!res.ok) {
        context.res.statusCode = 302;
        context.res.setHeader("Location", `/404`);
      } else {
        return res.json();
      }
    });
    let breadcrumb: [] = await fetch(
      `${config.api.rest}/v1/public/video/${context.query.videoid}/breadcrumb`
    ).then((res) => {
      if (!res.ok) {
        context.res.statusCode = 302;
        context.res.setHeader("Location", `/404`);
      } else {
        return res.json();
      }
    });
    return { props: { video, time, breadcrumb } };
  } catch {
    return { props: { video: { videos: [] } } };
  }
}

// TODO //
// Add proper video player
// Track selection and assignment based on quality
