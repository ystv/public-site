import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "video.js/dist/video-js.css";
import "../Components/VideoPlayer.css";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
