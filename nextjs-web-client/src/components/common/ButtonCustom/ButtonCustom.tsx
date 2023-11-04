import React, { CSSProperties, ReactNode, MouseEventHandler } from "react";
import styles from "./ButtonCustom.module.css";
import { Raleway } from "next/font/google";

const raleWay = Raleway({ subsets: ["latin", "vietnamese"] });

export default function ButtonCustom({
  className,
  style,
  hoverStyle,
  contentStyle,
  isOutline = false,
  onClick,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  hoverStyle?: CSSProperties;
  contentStyle?: CSSProperties;
  isOutline?: boolean;
  onClick?: MouseEventHandler;
  children: ReactNode;
}) {
  return (
    <button
      className={`${
        styles[isOutline ? "button-custom-outline" : "button-custom"]
      }${className ? ` ${className}` : ""}`}
      style={style}
      role="button"
      onClick={onClick}
    >
      <div
        className={`w-100 ${
          styles[isOutline ? "btn-bg-hover-outline" : "btn-bg-hover"]
        }`}
        style={hoverStyle}
      ></div>
      <div
        className={`${
          styles[isOutline ? "btn-content-outline" : "btn-content"]
        } ${raleWay.className}`}
        style={contentStyle}
      >
        {children}
      </div>
    </button>
  );
}
