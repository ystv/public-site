import config from "../../../config.json";
import YstvHead from "../../../Components/YstvHead";
import SeriesCell from "../../../Components/SeriesCell";
import VideoCell from "../../../Components/VideoCell";
import Breadcrumb from "../../../Components/Breadcrumb";

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
      <Breadcrumb breadcrumb={breadcrumb} />
      <h1>{series.name}</h1>
      <h3>{series.description}</h3>
      {series.childSeries.map((e, i) => (
        <SeriesCell series={e} />
      ))}
      {series.videos.map((e, i) => (
        <VideoCell video={e} key={i} />
      ))}
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
