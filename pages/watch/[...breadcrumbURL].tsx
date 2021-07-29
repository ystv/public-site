import Series from "./series/[seriesid]";
import Video from "./video/[videoid]";

interface Props {
  res;
  breadcrumb;
  type: pageType;
  time: number;
}

enum pageType {
  Video,
  Series,
  None,
}

export default function BreadcumbWatch({ res, breadcrumb, type, time }) {
  if (type == pageType.Video) {
    return <Video breadcrumb={breadcrumb} video={res.video} time={time} />;
  } else if (type == pageType.Series) {
    return <Series breadcrumb={breadcrumb} series={res.series} />;
  } else {
    return <div />;
  }
}

export async function getServerSideProps(context) {
  let type: pageType;
  let time: number = 0;
  let url: string;

  if (context.query.time !== undefined) {
    time = context.query.time;
  }

  try {
    let res = await fetch(
      `${
        process.env.REST_API
      }/v1/public/find/${context.query.breadcrumbURL.join("/")}`
    ).then((res) => {
      if (!res.ok) {
        context.res.statusCode = 302;
        context.res.setHeader("Location", `/404`);
      } else {
        return res.json();
      }
    });

    if (res.video == null) {
      type = pageType.Series;
      url = `series/${res.series.id}`;
    } else {
      type = pageType.Video;
      url = `video/${res.video.id}`;
    }

    let breadcrumb: [] = await fetch(
      `${process.env.REST_API}/v1/public/${url}/breadcrumb`
    ).then((res) => res.json());

    return {
      props: { res, time, breadcrumb, type },
    };
  } catch {
    return { props: { video: { videos: [] } } };
  }
}
