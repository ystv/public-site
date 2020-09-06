import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "video.js/dist/video-js.css";
import "../components/VideoPlayer/VideoPlayer.css";
import "../components/global.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Navbar />
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <div style={{ height: "4.5rem", flexShrink: 0 }} />
        <Component {...pageProps} />
        <div style={{ flex: 1 }} />
        <Footer />
      </div>
    </>
  );
}
