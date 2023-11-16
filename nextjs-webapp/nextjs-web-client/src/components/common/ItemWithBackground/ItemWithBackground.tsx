import React, { CSSProperties } from "react";
import DecoratedTitle from "../DecoratedTitle/DecoratedTitle";
import anim from "./ItemWithBackground.module.css";

type ItemWithBackgroundProps = {
  /**
   * Root component className
   */
  className?: string;
  /**
   * Root conponent style
   */
  style?: CSSProperties;
  classNames?: {
    background?: string;
    title?: string;
    subTitle?: string;
  };
  styles?: {
    background?: CSSProperties;
    title?: CSSProperties;
    subTitle?: CSSProperties;
  };
  title: string;
  subTitle?: string;
  hoverStyle?: "scale-all-out" | "scale-all-in" | "scale-background";
  /**
   * If you config the styles.background, the backgroundImage will override this
   */
  backgroundImageSrc?: string;
  titleAlign?: "left" | "center" | "right";
};

function ItemWithBackground({
  className,
  style,
  classNames,
  styles,
  title,
  subTitle,
  hoverStyle = "scale-background",
  backgroundImageSrc,
  titleAlign = "center",
}: ItemWithBackgroundProps) {
  return (
    <div
      className={`item-with-background${className ? ` ${className}` : ""}`}
      style={style}
    >
      <div
        className={`background-container ${anim.scale} ${
          anim[hoverStyle]
        }${classNames?.background ? ` ${classNames.background}` : ""}`}
        style={{
          backgroundImage:
            backgroundImageSrc || "url(/images/background-16.jpg)",
          ...styles?.background,
        }}
      >
        <p
          className={`item-title text-${titleAlign} tracking-widest font-medium text-2xl ${
            anim.scale
          } ${anim[hoverStyle]}${
            classNames?.title ? ` ${classNames?.title}` : ""
          }`}
          style={styles?.title}
        >
          {title}
        </p>
        {subTitle && (
          <DecoratedTitle
            className={`item-sub-title text-${titleAlign} ${anim.scale} py-1 ${anim[hoverStyle]}${
              classNames?.subTitle ? classNames?.subTitle : ""
            }`}
            style={styles?.subTitle}
            titleStyle={{ letterSpacing: "0.1em", fontWeight: 300 }}
          >
            {subTitle}
          </DecoratedTitle>
        )}
      </div>
    </div>
  );
}

export default ItemWithBackground;
