import LiveBanner from "../components/HomeLiveBanner";
import { ComponentStory } from "@storybook/react";
import React from "react";

export default {
  title: "UI Macro Elements/HomeLiveBanner",
  component: LiveBanner,
};

const Template: ComponentStory<typeof LiveBanner> = (args) => (
  <LiveBanner {...args} />
);
export const Page = Template.bind({});
Page.args = {};
