import { VideoItem } from "./Video";

export interface Playlist {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  videos: VideoItem[];
}
