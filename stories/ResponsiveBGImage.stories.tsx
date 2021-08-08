import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ResponsiveBGImage from "../components/ResponsiveBGImage";

export default {
  title: "UI Elements/ResponsiveBGImage",
  component: ResponsiveBGImage,
} as ComponentMeta<typeof ResponsiveBGImage>;

const Template: ComponentStory<typeof ResponsiveBGImage> = (args) => (
  <ResponsiveBGImage {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  children: (
    <h1>
      Lorem ipsum this is a test of some text and hopefully this should go over
      to line 2
    </h1>
  ),
};
