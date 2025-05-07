import YstvHead from "../../../components/YstvHead";
import SeriesCell from "../../../components/SeriesCell/SeriesCell";
import VideoCell from "../../../components/VideoCell/VideoCell";
import Breadcrumb from "../../../components/Breadcrumb";

import styles from "./seriesid.module.css";
import { Series } from "../../../types/api/Series";
import { IBreadcrumb } from "../../../types/api/Video";

interface Props {
  series: Series;
  breadcrumb: IBreadcrumb[];
}

export default function WatchSeries({ series, breadcrumb }: Props) {
  return (
    <>
      <YstvHead title={`Series - ${series.name}`} />
      <div className="center thin">
        <Breadcrumb breadcrumb={breadcrumb} />
        <h1>{series.name}</h1>
        <p dangerouslySetInnerHTML={{ __html: series.description }} />
        {series.childSeries && series.childSeries.length !== 0 ? (
          <h3>Series</h3>
        ) : null}
        <div className={styles.seriesContainer}>
          {series.childSeries.map((e, i) => (
            <div key={i} className={styles.flexSpacer}>
              <SeriesCell series={e} />
            </div>
          ))}
        </div>

        {series.videos && series.videos.length !== 0 ? <h3>Videos</h3> : null}
        <div className={styles.videoContainer}>
          {series.videos
            .sort((a, b) => {
              let x = a.id;
              let y = b.id;
              return x < y ? -1 : x > y ? 1 : 0;
            })
            .map((e, i) => (
              <div key={i} className={styles.flexSpacer}>
                <VideoCell video={e} key={i} />
              </div>
            ))}
        </div>
        <br />
        <br />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  let series = await fetch(
    `${process.env.REST_API}/v1/public/series/${context.query.seriesid}`,
  ).then((res): Promise<Series> => res.json());
  let breadcrumb = await fetch(
    `${process.env.REST_API}/v1/public/series/${context.query.seriesid}/breadcrumb`,
  ).then((res): Promise<IBreadcrumb> => res.json());
  return { props: { series, breadcrumb } };
}
