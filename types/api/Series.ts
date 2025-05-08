import { VideoMeta } from "./Video";

export interface Series {
  id: number;
  url: string;
  name: string;
  description: string;
  thumbnail: string;
  childSeries: SeriesMeta[];
  videos: VideoMeta[];
}

export interface SeriesMeta {
  id: number;
  url: string;
  name: string;
  description: string;
  thumbnail: string;
}
