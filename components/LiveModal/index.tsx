import styles from "./index.module.css";
import Index from "../VideoPlayer";
import YstvHead from "../YstvHead";

const testData = {
  id: 2469,
  seriesID: 466,
  name: "Roses Reports Live: Saturday Afternoon",
  url: "roses-reports-live-saturday-afternoon",
  description: "",
  thumbnail: "",
  broadcastDate: "2015-06-26T14:53:12Z",
  views: 0,
  duration: 818,
  files: [
    {
      uri: "legacy/14-15/15_Roses_Reports_Live_Saturday-Afternoon_sum11.mp4",
      mimeType: "video/mp4",
      mode: "watch",
      width: 640,
      height: 360,
    },
    {
      uri:
        "legacy/HDdownload/15_Roses_Reports_Live_Saturday-Afternoon_sum11.mp4",
      mimeType: "video/mp4",
      mode: "HDdownload",
      width: 1280,
      height: 720,
    },
    {
      uri: "legacy/playout/15_Roses_Reports_Live_Saturday-Afternoon_sum11.mp4",
      mimeType: "video/mp4",
      mode: "schedule",
      width: 1280,
      height: 720,
    },
    {
      uri: "legacy/14-15/15_Roses_Reports_Live_Saturday-Afternoon_sum11_HD.mp4",
      mimeType: "video/mp4",
      mode: "watch",
      width: 1280,
      height: 720,
    },
    {
      uri: "legacy/thumbs/02469/%05d.jpg",
      mimeType: "image/jpeg",
      mode: "thumbs",
      width: 80,
      height: 45,
    },
    {
      uri:
        "legacy/14-15/15_Roses_Reports_Live_Saturday-Afternoon_sum11_FHD.mp4",
      mimeType: "video/mp4",
      mode: "watch",
      width: 1920,
      height: 1080,
    },
  ],
};

const Embed = ({ video, time }) => {
  const videoJSOptions = {
    autoplay: false,
    playbackRates: [0.5, 1, 1.25, 1.5, 2],
    controls: true,
    fluid: true,
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

  let myplayer = Index(videoJSOptions, time, video.name);

  return myplayer;
};

const LiveModal = () => {
  return (
    <div className={styles.container}>
      <div className={styles.flexRow}>
        <div className={styles.livePulse} />
        <small>Live</small>
      </div>
      <div className={styles.innerFlex}>
        <div
          style={{
            flex: 2,
          }}
        >
          <Embed time={0} video={testData} />
          <br />
        </div>
        <div style={{ flex: 1, padding: "0 1rem" }}>
          <div>Channel</div>
          <h2>Title of Stream</h2>
          <h5>Live from Central Hall</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum ea
            explicabo, fugiat hic ipsa itaque laborum mollitia porro quasi quia
            quod rem repellendus repudiandae sequi voluptatum. Ad aliquid quos
            repellendus?
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveModal;
