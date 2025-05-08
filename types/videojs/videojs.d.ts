declare module "video.js" {
  // this tells the type system that the VideoJsPlayer object has a method seekButtons
  export interface VideoJsPlayer {
    qualityLevels(options?: VideoJsQualityButtonsOptions): void;
    hlsQualitySelector(options?: hlsQualitySelectorInterface): void;
  }

  // this tells the type system that the VideoJsPlayer initializer can have options for plugin seekButtons
  export interface VideoJsPlayerPluginOptions {
    qualityLevels?: VideoJsQualityButtonsOptions;
    videoJsResolutionSwitcher?: videoJsResolutionSwitcherOptions;
  }
}

export interface VideoJsQualityButtonsOptions {
  id: string;
  width?: number;
  height?: number;
  bitrate: number;
  enabled: function;
}

export interface hlsQualitySelectorInterface {
  displayCurrentQuality: boolean;
}

export interface videoJsResolutionSwitcherOptions {
  default: string;
  dynamicLabel: boolean;
}
