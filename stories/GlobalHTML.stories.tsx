import { ComponentStory, ComponentMeta } from "@storybook/react";

const Global = () => (
  <>
    <a href="">Link</a>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum quasi iure
      necessitatibus tempore nemo sequi dolores placeat cum officia dolore
      minima id assumenda aut quia optio, eveniet obcaecati. Ad, quo.
    </p>
  </>
);

export default {
  title: "Utilities/Global",
  component: Global,
} as ComponentMeta<typeof Global>;

const Template: ComponentStory<typeof Global> = (args) => <Global {...args} />;

export const Default = Template.bind({});
Default.args = {};
