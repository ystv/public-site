import VideoCell from "./VideoCell";
import { Component } from "react";

interface CarouselProps {
  videos: [];
  count?: number | 0;
  detail?: boolean;
  title?: string;
}

interface CarouselState {
  videos: [];
  count: 0;
}

class VideoCarousel extends Component<CarouselProps> {
  state = {
    count: 0,
    videos: this.props.videos.slice(0, 5),
  };
  handleFClick = async () => {
    this.setState(({ count }: CarouselProps) => ({
      count: count < 9 ? count + 1 : count,
    }));
    this.updateVideoBoxes();
  };

  handleRClick = async () => {
    this.setState(({ count }: CarouselProps) => ({
      count: count > 0 ? count - 1 : count,
    }));
    this.updateVideoBoxes();
  };

  updateVideoBoxes() {
    this.setState(({ count }: CarouselProps) => ({
      videos: this.props.videos.slice(count * 5, (count + 1) * 5),
    }));
  }

  render() {
    return (
      <>
        {this.props.title !== undefined ? <h2>{this.props.title}</h2> : <></>}
        <div style={{ display: "flex" }}>
          <button
            onClick={this.handleRClick}
            disabled={this.state.count == 0}
            style={{ flexGrow: 1 }}
          ></button>

          {this.state.videos.map((e, i) => (
            <VideoCell video={e} key={i} detail={this.props.detail} />
          ))}

          <button
            onClick={this.handleFClick}
            disabled={this.state.count == 9}
            style={{ flexGrow: 1 }}
          ></button>
        </div>
      </>
    );
  }
}

export default VideoCarousel;
