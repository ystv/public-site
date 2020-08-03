import { formatTime, removeHTMLTags } from "./commonFunctions";

interface Props {
  video: {
    id;
    seriesID;
    name;
    url;
    description;
    thumbnail;
    broadcastDate;
    views;
    duration;
  };
}

export default function VideoCell({ video }: Props) {
  let e = video;

  return (
    <div>
      <img
        src={`https://ystv.co.uk/static/images/videos/thumbnails/0${e.id}.jpg`}
        height="100"
      ></img>
      <a href={"/watch/video/" + e.id}>
        <h1>{e.name}</h1>
      </a>
      <h5>
        Published {new Date(e.broadcastDate).toLocaleString().split(",")[0]}
      </h5>
      <h5>{e.views} Views</h5>
      <h5>Duration: {formatTime(e.duration)}</h5>
      <h4>{removeHTMLTags(e.description)}</h4>
    </div>
  );
}
