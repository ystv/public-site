import YSTVHead from "../../../Components/YstvHead";
import YstvHead from "../../../Components/YstvHead";
import VideoPlayer from "../../../Components/VideoPlayer";

export default function Live() {
  const videoJSOptions = {
    autoplay: false,
    playbackRates: [0.5, 1, 1.25, 1.5, 2],
    height: 500,
    controls: true,
    sources: [
      {
        src: "https://content.jwplatform.com/manifests/yp34SRmf.m3u8",
      },
    ],
  };

  var myplayer = VideoPlayer(videoJSOptions, 0);

  return (
    <>
      <YstvHead title="Live" />
      <h1>Live videos</h1>
      {myplayer}
    </>
  );
}
