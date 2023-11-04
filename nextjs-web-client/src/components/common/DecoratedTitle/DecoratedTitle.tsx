import React from "react";
import styles from "./DecoratedTitle.module.css";

export default function DecoratedTitle({
  children,
  className,
  style,
  titleClassName,
  titleStyle,
  twoSideĐecorLine = "both",
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  titleClassName?: string;
  titleStyle?: React.CSSProperties;
  twoSideĐecorLine?: "left" | "right" | "both";
}) {
  return (
    <div
      className={`${styles["decorated-title-container"]} ${
        className ? className : ""
      }`}
      style={style}
    >
      {(twoSideĐecorLine === "both" || twoSideĐecorLine === "left") && (
        <span className={styles["decorated-line-before"]}></span>
      )}
      <span
        className={`${styles["decorated-title-content"]} ${
          titleClassName ? titleClassName : ""
        }`}
        style={titleStyle}
      >
        {children}
      </span>
      {(twoSideĐecorLine === "both" || twoSideĐecorLine === "right") && (
        <span className={styles["decorated-line-after"]}></span>
      )}
    </div>
  );
}
