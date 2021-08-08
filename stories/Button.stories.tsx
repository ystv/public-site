import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Button from "../components/Button";

export default {
  title: "UI Elements/Button",
  component: Button,
  argTypes: {
    primaryColour: { control: "color" },
    secondaryColour: { control: "color" },
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  outline: false,
  label: "Button",
};

export const Outline = Template.bind({});
Outline.args = {
  outline: true,
  label: "Button",
};

export const PrimaryColour = Template.bind({});
PrimaryColour.args = {
  outline: false,
  label: "Button",
  primaryColour: "#4da89d",
  secondaryColour: "#0f5f87",
};

export const OutlineColour = Template.bind({});
OutlineColour.args = {
  outline: true,
  label: "Button",
  primaryColour: "#1c84da",
};
