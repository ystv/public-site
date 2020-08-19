import Navbar from "../components-1/Navbar";
import Footer from "../components-1/Footer";
import "video.js/dist/video-js.css";
import "../components-1/VideoPlayer.css";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
