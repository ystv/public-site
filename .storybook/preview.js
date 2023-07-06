import "../components/global.css";
import "video.js/dist/video-js.css";
import "../components/VideoPlayer/VideoPlayer.css";

import * as NextImage from "next/legacy/image";

const OriginalNextImage = NextImage.default;
Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => (
    <OriginalNextImage {...props} unoptimized placeholder="empty" />
  ),
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
