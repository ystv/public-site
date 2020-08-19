import { formatTime, removeHTMLTags } from "./commonFunctions";
import { SyntheticEvent } from "react";

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
  style?;
}

interface eventTargetInterfaceImg {
  target: {
    onerror;
    src;
  };
}

export default function VideoCell({ video, style }: Props) {
  let e = video;

  return (
    <div style={style}>
      <a href={"/watch/video/" + e.id}>
        <img
          src={`https://ystv.co.uk/static/images/videos/thumbnails/0${e.id}.jpg`}
          height="100"
          onError={(e: SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "https://ystv.co.uk/static/images/logos/YSTV_meta.jpg";
            e.target;
          }}
        ></img>

        <h2>{e.name}</h2>
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
