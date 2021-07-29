import { ComponentStory, ComponentMeta } from "@storybook/react";

const HtmlTags = () => (
  <>
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <h4>Heading 4</h4>
    <h5>Heading 5</h5>
    <a href="">Link</a>
    <h1>Heading 1</h1>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum quasi iure
      necessitatibus tempore nemo sequi dolores placeat cum officia dolore
      minima id assumenda aut quia optio, eveniet obcaecati. Ad, quo.
    </p>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum quasi iure
      necessitatibus tempore nemo sequi dolores placeat cum officia dolore
      minima id assumenda aut quia optio, eveniet obcaecati. Ad, quo.
    </p>
    <button>Click me!</button>
  </>
);

export default {
  title: "Utilities/Styleguide",
};

export const Default = () => <HtmlTags />;
