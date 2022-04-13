import YstvHead from "../../../components/YstvHead";
import VideoPlayer from "../../../components/VideoPlayer";

import styles from "../embed.module.css";
import { GetServerSideProps } from "next";
import { channel } from "../../watch/live/[liveURLName]";

export default function Embed({ channel }) {
  const videoJSOptions = {
    autoplay: false,
    playbackRates: [0.5, 1, 1.25, 1.5, 2],
    height: 500,
    controls: true,
    liveui: true,
    fill: true,
    sources: [
      {
        src: channel.outputURL,
        type: "application/x-mpegURL",
      },
    ],
  };

  return (
    <div className={styles.bg}>
      <YstvHead title={`Watch Live - ${channel.name}`} />
      <VideoPlayer options={videoJSOptions} time={0} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  function redirect() {
    context.res.statusCode = 302;
    context.res.setHeader("Location", `/404`);
  }

  const channel: channel = await fetch(
    `${process.env.REST_API}/v1/public/playout/channel/${context.query.embed_id}`
  ).then((res) => {
    if (!res.ok) {
      redirect();
    } else {
      return res.json();
    }
  });

  if (channel == undefined) redirect();

  return { props: { channel } };
};
