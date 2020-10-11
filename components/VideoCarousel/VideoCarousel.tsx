import VideoCell from "../VideoCell/VideoCell";
import { createRef } from "react";

import styles from "./VideoCarousel.module.css";

import Carousel from "react-multi-carousel";

interface CarouselProps {
  videos: [];
  detail?: boolean;
  title?: string;
  inverted?: boolean | false;
}

// class VideoCarousel extends Component<CarouselProps> {
// state = {
//   count: 0,
//   videos: this.props.videos.slice(0, 5),
// };
// handleFClick = async () => {
//   this.setState(({ count }: CarouselProps) => ({
//     count: count < 9 ? count + 1 : count,
//   }));
//   this.updateVideoBoxes();
// };

// handleRClick = async () => {
//   this.setState(({ count }: CarouselProps) => ({
//     count: count > 0 ? count - 1 : count,
//   }));
//   this.updateVideoBoxes();
// };

// updateVideoBoxes() {
//   this.setState(({ count }: CarouselProps) => ({
//     videos: this.props.videos.slice(count * 5, (count + 1) * 5),
//   }));
// }

export default function VideoCarousel({
  videos,
  detail,
  title,
  inverted = false,
}: CarouselProps) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1600 },
      items: 5,
      slidesToSlide: 5, // optional, default to 1.
    },
    laptop: {
      breakpoint: { max: 1600, min: 1440 },
      items: 4,
      slidesToSlide: 4, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1440, min: 1000 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    lphone: {
      breakpoint: { max: 1000, min: 650 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 650, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const CustomButtonGroupAsArrows = ({ next, previous }: any) => {
    return (
      <div
        style={{
          textAlign: "center",
        }}
      >
        <button onClick={previous}>Prev</button>
        <button onClick={next}>Next</button>
      </div>
    );
  };

  var carouselRef = createRef<Carousel>();

  return (
    <div className={styles.container}>
      {title !== undefined ? <h1>{title}</h1> : <></>}
      {/* <div className={styles.flexContainer}>
          <button
            onClick={this.handleRClick}
            disabled={this.state.count == 0}
            style={{ flexGrow: 1 }}
          ></button>

          {this.state.videos.map((e, i) => (
            <VideoCell
              video={e}
              key={i}
              detail={this.props.detail}
              inverted={this.props.inverted}
            />
          ))}

          <button
            onClick={this.handleFClick}
            disabled={this.state.count == 9}
            style={{ flexGrow: 1 }}
          ></button>
        </div> */}
      <div className={styles.flexContainer}>
        <a
          className={`${styles.round} ${inverted ? styles.inv : ""}`}
          onClick={() =>
            carouselRef.current.goToSlide(
              carouselRef.current.state.currentSlide -
                carouselRef.current.state.slidesToShow
            )
          }
        >
          &lsaquo;
        </a>

        <Carousel
          ref={carouselRef}
          swipeable={true}
          draggable={false}
          arrows={false}
          //customButtonGroup={<CustomButtonGroupAsArrows />}
          showDots={true}
          responsive={responsive}
          renderButtonGroupOutside
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass={styles.carouselcontainer}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {videos.map((e, i) => (
            <VideoCell video={e} key={i} detail={detail} inverted={inverted} />
          ))}
        </Carousel>
        <a
          className={`${styles.round} ${inverted ? styles.inv : ""}`}
          onClick={() =>
            carouselRef.current.goToSlide(
              carouselRef.current.state.currentSlide +
                carouselRef.current.state.slidesToShow
            )
          }
        >
          &rsaquo;
        </a>
      </div>
      <br />
    </div>
  );
}
