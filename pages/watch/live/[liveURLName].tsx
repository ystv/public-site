import React from "react";
import YstvHead from "../../../components/YstvHead";
import VideoPlayer from "../../../components/VideoPlayer";
import { GetServerSideProps } from "next";
import Link from "next/link";

export default function WatchLive({ channel }: { channel: channel }) {
  const videoJSOptions = {
    autoplay: false,
    playbackRates: [0.5, 1, 1.25, 1.5, 2],
    height: 500,
    controls: true,
    sources: [
      {
        src: channel.outputURL,
      },
    ],
  };

  var myplayer = VideoPlayer(videoJSOptions, 0);

  return (
    <div className="center thin">
      <br />
      <Link href="/watch/live">&larr; Back to live channels</Link>
      <YstvHead title={`Live - ${channel.name}`} />
      <h1>Live - {channel.name}</h1>
      {myplayer}
      <p>{channel.description}</p>
    </div>
  );
}

export const getServerSideProps:GetServerSideProps = async (context) => {
  function redirect() {
    context.res.statusCode = 302;
    context.res.setHeader("Location", `/404`);
  }

  const channel: channel = await fetch(
    `${process.env.REST_API}/v1/public/playout/channel/${context.query.liveURLName}`
  ).then((res) => {
    if (!res.ok) {
      redirect();
    } else {
      return res.json();
    }
  });

  if (channel == undefined) redirect();

  return { props: { channel } };
}

export interface channel {
  outputURL: string;
  urlName: string;
  thumbnail: string;
  scheduledEnd: string;
  name: string;
  description: string;
  outputType: string;
  location: string;
  status: string;
  scheduledStart: string;
}
