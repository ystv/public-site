import LiveBanner from "../components/HomeLiveBanner";
import { ComponentStory } from "@storybook/react";
import React from "react";
import { Channel } from "../pages/watch/live/[liveURLName]";
import { channelStatus } from "../types/api/Channel";

export default {
  title: "UI Macro Elements/HomeLiveBanner",
  component: LiveBanner,
};

const Template: ComponentStory<typeof LiveBanner> = (args:object) => (
  <LiveBanner {...args} />
);
export const Page = Template;

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
