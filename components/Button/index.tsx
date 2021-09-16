import { MouseEventHandler } from "react";
import styles from "./index.module.css";

interface Props {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  label;
  outline?: boolean;
  primaryColour?: string;
  secondaryColour?: string;
}

export default function Button({
  onClick,
  label,
  outline = false,
  primaryColour,
  secondaryColour,
}: Props) {
  return (
    <button
      className={`${styles.button} ${outline && styles.transparentButton}`}
      onClick={onClick}
      style={
        outline
          ? { color: primaryColour, borderColor: primaryColour }
          : {
              color: secondaryColour,
              backgroundColor: primaryColour,
              borderColor: primaryColour,
            }
      }
    >
      {label}
    </button>
  );
}
