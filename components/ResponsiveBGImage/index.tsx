import styles from "./index.module.css";
import Image from "next/image";
import { FunctionComponent, PropsWithChildren } from "react";
import { Property } from "csstype";

interface ResponsiveBGImageProps {
  height?: Property.Height<string | number>;
  width?: Property.Width<string | number>;
  minHeight?: string;
  src;
  priority?: boolean;
  placeholder?: "empty" | "blur";
  alt?: string;
  blur?: boolean;
  backgroundColourOverlay?: Property.Background<string | number>;
}

const ResponsiveBGImage: FunctionComponent<
  PropsWithChildren<ResponsiveBGImageProps>
> = ({
  height,
  width = "100%",
  minHeight,
  src,
  children,
  priority = false,
  placeholder = "empty",
  alt = "",
  blur = false,
  backgroundColourOverlay,
}) => (
  <div
    className={styles.wrapperDiv}
    style={{
      width: width,
      height: height ? height : undefined,
      minHeight: minHeight ? minHeight : undefined,
    }}
  >
    <div className={styles.imageDiv}>
      <Image
        src={src}
        priority={priority}
        placeholder={placeholder}
        alt={alt}
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
      />
    </div>
    <div
      className={`${styles.contentsDiv} ${blur && styles.blur}`}
      style={{
        background: backgroundColourOverlay
          ? backgroundColourOverlay
          : undefined,
      }}
    >
      {children}
    </div>
  </div>
);

export default ResponsiveBGImage;
