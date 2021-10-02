import styles from "./index.module.css";

export default function GradientDiv({ children }) {
  return <div className={styles.gradientDiv}>{children}</div>;
}
