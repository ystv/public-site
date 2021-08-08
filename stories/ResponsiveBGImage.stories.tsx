import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ResponsiveBGImage from "../components/ResponsiveBGImage";

import image from "../public/site-images/carousel.jpg";

export default {
  title: "UI Elements/ResponsiveBGImage",
  component: ResponsiveBGImage,
} as ComponentMeta<typeof ResponsiveBGImage>;

const Template: ComponentStory<typeof ResponsiveBGImage> = (args) => (
  <ResponsiveBGImage {...args} />
);

export const Page = Template.bind({});
Page.args = {
  src: image,
  backgroundColourOverlay: "rgba(73, 73, 73, 0.14)",
  width: "",
  children: (
    <h1 style={{ color: "white" }}>
      Lorem ipsum this is a test of some text and hopefully this should go over
      to line 2
    </h1>
  ),
};
