import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styles from "./SliderCustom.module.css";
import React from "react";

type Props = {
  className?: string;
  onValueChange?: (value: number | number[]) => void;
};

export default function SliderCustom({ className, onValueChange }: Props) {
  return (
    <div className={`slider-custom${className ? ` ${className}` : ""}`}>
      <Slider
        onChange={onValueChange}
        styles={{
          handle: {
            borderRadius: 0,
            cursor: "pointer",
            transform: "rotate(45deg)",
            backgroundColor: "#be9667",
            borderColor: "#be9667",
          },
          track: {
            backgroundColor: "#be9667",
          },
        }}
      />
    </div>
  );
}
