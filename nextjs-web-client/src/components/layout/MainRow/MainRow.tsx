import React, { CSSProperties, ReactNode } from "react";
import { Row } from "react-bootstrap";

export default function MainRow({
  children,
  className,
  style,
  isOverflowed = false,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  isOverflowed?: boolean;
}) {
  return (
    <Row
      className={`main-row${
        isOverflowed
          ? ` main-row-overflow mx-[calc(-50px-9rem)] px-[calc(50px+9rem)]`
          : ""
      }${className ? ` ${className}` : ""}`}
      style={style}
    >
      {children}
    </Row>
  );
}
