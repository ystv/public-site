import YSTVHead from "../../../components-1/YstvHead";
import YstvHead from "../../../components-1/YstvHead";
import VideoPlayer from "../../../components-1/VideoPlayer";

export default function Live() {
  const videoJSOptions = {
    autoplay: false,
    playbackRates: [0.5, 1, 1.25, 1.5, 2],
    height: 500,
    controls: true,
    sources: [
      {
        src: "http://stream.ystv.co.uk/hls/stream1.m3u8",
      },
    ],
  };

  var myplayer = VideoPlayer(videoJSOptions, 0);

  return (
    <>
      <YstvHead title="Live" />
      <h1>Live videos</h1>
      <h3>Stream 1</h3>
      {myplayer}
    </>
  );
}
