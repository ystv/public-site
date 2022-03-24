import YstvHead from "../../components/YstvHead";
import VideoPlayer from "../../components/VideoPlayer";

import styles from "./embed.module.css";

export default function Embed({ video, time }) {
  const videoJSOptions = {
    autoplay: false,
    playbackRates: [0.5, 1, 1.25, 1.5, 2],
    controls: true,
    responsive: true,
    fill: true,
    sources: video.files
      .filter((e) => e.mode == "watch")
      .map((e, i, t) => {
        let sel = i == t.length - 1 ? true : false; // Sets to last item in list (assumed to be highest quality)
        return {
          src: `https://ystv.co.uk/videofile${e.uri.substring(6)}`,
          type: e.mimeType,
          label: `${e.height}p`,
          selected: sel,
        };
      }),
  };

  return (
    <div className={styles.bg}>
      <YstvHead title={`Watch - ${video.name}`} />
      <VideoPlayer options={videoJSOptions} time={time} title={video.name} />
    </div>
  );
}

export async function getServerSideProps(context) {
  let time: number = 0;
  if (context.query.time !== undefined) {
    time = context.query.time;
  }
  try {
    let video = await fetch(
      `${process.env.REST_API}/v1/public/video/${context.query.embed_id}`
    ).then((res) => {
      if (!res.ok) {
        context.res.statusCode = 302;
        context.res.setHeader("Location", `/404`);
      } else {
        return res.json();
      }
    });
    return { props: { video, time } };
  } catch {
    return { props: { video: { videos: [] } } };
  }
}
