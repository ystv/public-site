import styles from "./index.module.css";
import Image from "next/image";
import { FunctionComponent } from "react";

import image from "../../public/site-images/carousel.jpg";

interface ResponsiveBGImageProps {
  height?: string;
  width?: string;
  minHeight?: string;
}

const ResponsiveBGImage: FunctionComponent<ResponsiveBGImageProps> = ({
  height,
  width = "100%",
  minHeight,
  children,
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
      <Image src={image} layout="fill" objectFit="cover" />
    </div>
    <div className={styles.contentsDiv}>{children}</div>
  </div>
);

export default ResponsiveBGImage;
