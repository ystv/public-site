import config from "../../../config.json";
import YstvHead from "../../../components/YstvHead";
import SeriesCell from "../../../components/SeriesCell";
import VideoCell from "../../../components/VideoCell";
import Breadcrumb from "../../../components/Breadcrumb";

import styles from "./seriesid.module.css";

interface Props {
  series: {
    id;
    url;
    name;
    description;
    thumbnail;
    childSeries;
    videos;
  };
  breadcrumb;
}

export default function WatchSeries({ series, breadcrumb }: Props) {
  return (
    <>
      <YstvHead title={`Series - ${series.name}`} />
      <div className={styles.container}>
        <Breadcrumb breadcrumb={breadcrumb} />
        <h1>{series.name}</h1>
        <p>{series.description}</p>
        {series.childSeries.length !== 0 ? <h3>Series</h3> : null}
        <div className={styles.seriesContainer}>
          {series.childSeries.map((e) => (
            <SeriesCell series={e} />
          ))}
        </div>

        {series.videos.length !== 0 ? <h3>Videos</h3> : null}
        <div className={styles.videoContainer}>
          {series.videos.map((e, i) => (
            <VideoCell video={e} key={i} />
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    let series = await fetch(
      `${config.api.rest}/v1/public/series/${context.query.seriesid}`
    ).then((res) => res.json());
    let breadcrumb = await fetch(
      `${config.api.rest}/v1/public/series/${context.query.seriesid}/breadcrumb`
    ).then((res) => res.json());
    return { props: { series, breadcrumb } };
  } catch {
    return { props: { series: [], breadcrumb: [] } };
  }
}
