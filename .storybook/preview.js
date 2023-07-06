import "../components/global.css";
import "video.js/dist/video-js.css";
import "../components/VideoPlayer/VideoPlayer.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
