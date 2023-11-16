import DropdownCustom from "@/components/common/DropdownCustom/DropdownCustom";
import Image from "next/image";
import Link from "next/link";
import React, { CSSProperties } from "react";

export default function UserInfoDropdown({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <DropdownCustom
      className={`dropdown-custom p-0${className ? ` ${className}` : ""}`}
      style={style}
    >
      <DropdownCustom.LinkToggle className="p-0">
        <Image
          alt="avatar"
          src="/images/user-avatar-thumbnail.jpg"
          className="rounded-circle"
          width={250}
          height={256}
          style={{
            width: "auto",
            maxHeight: "32.5px",
          }}
        />
      </DropdownCustom.LinkToggle>
      <DropdownCustom.SubContent
        style={{
          right: 0,
          width: "150px",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "3.3px",
        }}
        className="p-4"
      >
        <Link
          className="hover:text-nav-link-hover uppercase text-[color:white]"
          href="/user/info"
        >
          Info
        </Link>
        <Link
          className="hover:text-nav-link-hover uppercase text-[color:white]"
          href="/user/signout"
        >
          Log Out
        </Link>
      </DropdownCustom.SubContent>
    </DropdownCustom>
  );
}
