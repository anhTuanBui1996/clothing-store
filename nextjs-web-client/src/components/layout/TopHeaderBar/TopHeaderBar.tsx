"use client";
import "animate.css";
import React, { useEffect, useState, useContext } from "react";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { IconContext } from "react-icons";
import { MdOutlinePhone, MdOutlineEmail, MdArrowUpward } from "react-icons/md";
import ButtonCustom from "@/components/common/ButtonCustom/ButtonCustom";
import DropdownCustom from "@/components/common/DropdownCustom/DropdownCustom";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import UserInfoDropdown from "../UserInfoDropdown/UserInfoDropdown";
import AuthContext from "@/components/context/AuthContext";

export default function TopHeaderBar() {
  const currentPathName = usePathname();
  const isAuthenticated = useContext(AuthContext).isAuthenticated;

  const [isInLoginPage, setIsInLoginPage] = useState<boolean>(true);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [isMenuFixedTop, setIsMenuFixedTop] = useState<boolean>(false);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollPosition > 151.19) {
      setIsMenuFixedTop(true);
    } else {
      setIsMenuFixedTop(false);
    }
  }, [scrollPosition]);

  useEffect(() => {
    if (currentPathName.startsWith("/signin") || currentPathName.startsWith("/signup")) {
      setIsInLoginPage(true);
    } else {
      setIsInLoginPage(false);
    }
  }, [isInLoginPage, currentPathName]);

  return (
    <div className="top-header-bar">
      {!isInLoginPage && (
        <header
          style={{
            backgroundImage: "url(/images/header_images.jpg)",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
            backgroundSize: "auto 900px",
          }}
        >
          <IconContext.Provider value={{ size: "1.2rem" }}>
            <Navbar
              className="py-0"
              data-bs-theme="dark"
              style={{
                backgroundColor: "#160c06c0",
                borderBottom: "1px solid rgba(255,255,255,0.09)",
              }}
            >
              <Container fluid className="flex-wrap">
                <Col>
                  <Row style={{ padding: "1em 2em" }}>
                    <Col>
                      <div
                        className="empty-spc"
                        style={{ height: "2.25rem" }}
                      ></div>
                      <Nav className="gap-3">
                        <span
                          style={{
                            fontWeight: 600,
                            fontSize: "13px",
                          }}
                          className="text-[var(--bs-nav-link-color)] hover:text-brown-back flex items-center cursor-pointer"
                        >
                          <MdOutlinePhone
                            className="mr-2"
                            style={{ fontSize: "12px" }}
                          />
                          <span>090-134-586</span>
                        </span>
                        <span
                          style={{
                            fontWeight: 600,
                            fontSize: "13px",
                          }}
                          className="text-[var(--bs-nav-link-color)] hover:text-brown-back flex items-center cursor-pointer"
                        >
                          <MdOutlineEmail
                            className="mr-2"
                            style={{ fontSize: "12px" }}
                          />
                          <span>info@yoursite.com</span>
                        </span>
                      </Nav>
                    </Col>
                    <Col className="flex justify-center flex-col">
                      <div
                        className="empty-spc"
                        style={{
                          width: "100%",
                          height: "1.2rem",
                        }}
                      ></div>
                      <Link href="/">
                        <Image
                          width={200}
                          height={160}
                          className="logo_image"
                          src="/images/retina-logo.png"
                          alt="Can't load logo image"
                          style={{
                            width: "auto",
                            maxHeight: "100px",
                            margin: "auto",
                          }}
                        />
                      </Link>
                    </Col>
                    <Col>
                      <div
                        className="empty-spc"
                        style={{ height: "2.25rem" }}
                      ></div>
                      <Nav className="sign-info justify-end">
                        {isAuthenticated ? (
                          <UserInfoDropdown />
                        ) : (
                          <Link
                            className="px-0 py-0"
                            style={{ color: "inherit", float: "right" }}
                            href="/signin"
                          >
                            <ButtonCustom
                              isOutline
                              style={{
                                padding: "1.315em 1.62em",
                              }}
                            >
                              SIGN IN
                            </ButtonCustom>
                          </Link>
                        )}
                      </Nav>
                    </Col>
                  </Row>
                  <Row
                    className={`fixed-menu-header py-2${
                      isMenuFixedTop
                        ? " fixed top-0 left-0 bg-[#160c06] w-[calc(100vw+6px)] opacity-100 z-50"
                        : ""
                    }`}
                  >
                    <Col className="flex justify-center">
                      <Nav
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          letterSpacing: "0.3em",
                          alignItems: "center",
                        }}
                      >
                        <Link
                          className="py-2 text-[var(--bs-nav-link-color)] text-brown-back hover:text-brown-back w-44 text-center"
                          href="/"
                        >
                          HOME
                        </Link>
                        <div
                          className="border bg-brown-back"
                          style={{ height: "13px" }}
                        ></div>
                        <Link
                          className="py-2 text-[var(--bs-nav-link-color)] hover:text-brown-back w-44 text-center"
                          href="/shopping"
                        >
                          SHOPPING
                        </Link>
                        <div
                          className="border bg-brown-back"
                          style={{ height: "13px" }}
                        ></div>
                        <DropdownCustom className="w-44">
                          <DropdownCustom.LinkToggle
                            href="/items"
                            className="py-2 w-full inline-block"
                          >
                            ITEMS
                          </DropdownCustom.LinkToggle>
                          <DropdownCustom.SubContent className="w-44">
                            <Link
                              href="/items/brand"
                              className="hover:text-nav-link-hover text-[color:white]"
                            >
                              BRAND
                            </Link>
                            <Link
                              href="/items/category"
                              className="hover:text-nav-link-hover text-[color:white]"
                            >
                              CATEGORY
                            </Link>
                          </DropdownCustom.SubContent>
                        </DropdownCustom>
                        <div
                          className="border bg-brown-back"
                          style={{ height: "13px" }}
                        ></div>
                        <Link
                          className="py-2 text-[var(--bs-nav-link-color)] hover:text-brown-back w-44 text-center"
                          href="/about"
                        >
                          ABOUT
                        </Link>
                      </Nav>
                    </Col>
                  </Row>
                  {isMenuFixedTop &&
                    (isAuthenticated ? (
                      <UserInfoDropdown
                        style={{
                          position: "fixed",
                          top: "0.5rem",
                          right: "0.5rem",
                          zIndex: 51,
                        }}
                      />
                    ) : (
                      <Link
                        className="px-0 py-0"
                        style={{
                          color: "inherit",
                          position: "fixed",
                          top: "0.5rem",
                          right: "calc(var(--bs-gutter-x) * .5 + 2em)",
                          zIndex: 51,
                        }}
                        href="/signin"
                      >
                        <ButtonCustom
                          isOutline
                          style={{
                            padding: "0.915em 1.62em",
                          }}
                        >
                          SIGN IN
                        </ButtonCustom>
                      </Link>
                    ))}
                </Col>
              </Container>
            </Navbar>
          </IconContext.Provider>
          {isMenuFixedTop && (
            <div className="empty-spc" style={{ height: "48.5px" }}></div>
          )}
        </header>
      )}
      <ButtonCustom
        isOutline
        className={`w-[50px] h-[50px] flex justify-center items-center bottom-16 right-16 animate__animated animate__faster animate__fade${
          isMenuFixedTop ? "InUp" : "OutDown"
        }`}
        style={{
          position: "fixed",
          backgroundColor: "rgb(22, 12, 6)",
        }}
        onClick={handleScrollToTop}
      >
        <MdArrowUpward size={20} color="#fff" />
      </ButtonCustom>
    </div>
  );
}
