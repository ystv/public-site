import styles from "./index.module.css";
import Image from "next/image";
import { FunctionComponent } from "react";
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

const ResponsiveBGImage: FunctionComponent<ResponsiveBGImageProps> = ({
  height,
  width = "100%",
  minHeight,
  children,
  src,
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
      height: height ? height : null,
      minHeight: minHeight ? minHeight : null,
    }}
  >
    <div className={styles.imageDiv}>
      <Image
        src={src}
        layout="fill"
        objectFit="cover"
        priority={priority}
        placeholder={placeholder}
        alt={alt}
      />
    </div>
    <div
      className={`${styles.contentsDiv} ${blur && styles.blur}`}
      style={{
        background: backgroundColourOverlay ? backgroundColourOverlay : null,
      }}
    >
      {children}
    </div>
  </div>
);

export default ResponsiveBGImage;