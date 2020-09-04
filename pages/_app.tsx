import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "video.js/dist/video-js.css";
import "../components/VideoPlayer.css";
import "../components/global.css";

export default function App({ Component, pageProps }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        paddingBottom: "4rem",
      }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Open+Sans"
      ></link>
      <Navbar />
      <div style={{ height: "4.5rem" }} />
      <div style={{ padding: "1rem", width: "80rem", margin: "auto" }}>
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}
