import { Series } from "./Series";

export interface VideoMeta {
  id: number;
  seriesID: number;
  name: string;
  url: string;
  description: string;
  thumbnail: string;
  broadcastDate: Date;
  views: number;
  duration: number;
}

export interface VideoFile {
  uri: string;
  mimeType: string;
  mode: string;
  width: number;
  height: number;
}

export interface VideoItem {
  id: number;
  seriesID: number;
  name: string;
  url: string;
  description: string;
  thumbnail: string;
  broadcastDate: Date;
  views: number;
  duration: number;
  files: VideoFile[];
}

export interface IBreadcrumb {
  id: number;
  url: string;
  useInURL: boolean;
  name: string;
}

export interface IBreadcrumbItem {
  video: VideoItem | null;
  series: Series | null;
}
