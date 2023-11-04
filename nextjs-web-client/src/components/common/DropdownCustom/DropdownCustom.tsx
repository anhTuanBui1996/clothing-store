import React, { CSSProperties, ReactNode } from "react";
import styles from "./DropdownCustom.module.css";
import Link from "next/link";

function DropdownCustom({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`${styles["dropdown-custom"]}${
        className ? ` ${className}` : ""
      }`}
      style={style}
    >
      {children}
    </div>
  );
}

function LinkToggle({
  children,
  className,
  style,
  href,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  href?: string;
}) {
  return href ? (
    <Link
      className={`${styles["dropdown-custom-toggle"]}${
        className ? ` ${className}` : ""
      }`}
      style={style}
      href={href}
    >
      {children}
    </Link>
  ) : (
    <span
      className={`${styles["dropdown-custom-toggle"]}${
        className ? ` ${className}` : ""
      }`}
      style={style}
    >
      {children}
    </span>
  );
}

function SubContent({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`${styles["dropdown-custom-content"]}${
        className ? ` ${className}` : ""
      }`}
      style={style}
    >
      {children}
    </div>
  );
}

DropdownCustom.LinkToggle = LinkToggle;

DropdownCustom.SubContent = SubContent;

export default DropdownCustom;
