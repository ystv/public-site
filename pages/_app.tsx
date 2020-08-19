import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "video.js/dist/video-js.css";
import "../components/VideoPlayer.css";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
