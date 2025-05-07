import LiveFeaturedPlayerBanner from "../components/LiveFeaturedPlayerBanner";
import { Channel } from "../pages/watch/live/[liveURLName]";

export default {
  title: "UI Macro Elements/LiveFeaturedPlayerBanner",
};

export const Page = () => <LiveFeaturedPlayerBanner channel={testData} />;

const testData: Channel = {
  urlName: "tennis",
  name: "SU Tennis Championships",
  description: "The biggest student unions go head to head at Tennis!",
  thumbnail: "https://ystv.co.uk/static/images/videos/thumbnails/03436.jpg",
  outputType: "hls",
  outputURL: "https://stream.ystv.co.uk/hls/stream1.m3u8",
  status: "scheduled",
  location: "York Sport Village",
  scheduledStart: "2021-07-30T10:30:00Z",
  scheduledEnd: "2021-07-30T12:30:00Z",
};
