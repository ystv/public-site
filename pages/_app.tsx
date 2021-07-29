import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "video.js/dist/video-js.css";
import "../components/VideoPlayer/VideoPlayer.css";
import "../components/global.css";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  if (useRouter().pathname.split("/")[1] !== "embed") {
    return (
      <>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <Navbar />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <div style={{ height: "4.5rem", flexShrink: 0 }} />
          <Component {...pageProps} />
          <div style={{ flexShrink: 0, flexGrow: 1, minHeight: "2rem" }} />
          <Footer />
        </div>
      </>
    );
  } else {
    return <Component {...pageProps} />;
  }
}
