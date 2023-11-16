"use client";
import React, { useState } from "react";
import { Carousel, Col, Nav, Row } from "react-bootstrap";
import { Playfair_Display } from "next/font/google";
import LocalFont from "next/font/local";
import ButtonCustom from "@/components/common/ButtonCustom/ButtonCustom";
import DecoratedTitle from "@/components/common/DecoratedTitle/DecoratedTitle";
import Image from "next/image";
import {
  MdFacebook,
  MdLocationPin,
  MdOutlinePhonelinkRing,
  MdOutlineWatchLater,
} from "react-icons/md";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import MainContainer from "@/components/layout/MainContainer/MainCustom";
import MainRow from "@/components/layout/MainRow/MainRow";

const playfairDisplay = Playfair_Display({
  weight: "400",
  style: "italic",
  subsets: ["latin", "cyrillic"],
});

const butlerRegular = LocalFont({
  src: [{ path: "./../fonts/Butler-Font/Butler_Regular.otf" }],
});

const butlerLight = LocalFont({
  src: [{ path: "./../fonts/Butler-Font/Butler_Light.otf" }],
});

export default function Page() {
  const [animStateTop, setanimStateTop] = useState<string>(
    "animate__fadeInDown"
  );
  const [animStateBottom, setanimStateBottom] =
    useState<string>("animate__fadeInUp");
  const handleChangeCarouselItem = (i: number) => {
    switch (i) {
      case 0:
        setanimStateTop("animate__fadeInDown");
        setanimStateBottom("animate__fadeInUp");
        break;
      case 1:
      case 2:
        setanimStateTop("animate__bounceInRight");
        setanimStateBottom("animate__bounceInLeft");
        break;
      default:
        setanimStateTop("");
        setanimStateBottom("");
        break;
    }
  };
  return (
    <main className="home-page">
      <Carousel
        slide={false}
        onSlide={handleChangeCarouselItem}
        interval={null}
        style={{
          backgroundImage: "url(/images/header_images.jpg)",
          backgroundPosition: "center -200.688px",
          backgroundRepeat: "no-repeat",
          backgroundSize: "auto 900px",
        }}
      >
        <Carousel.Item style={{ position: "relative" }}>
          <div
            className={`${butlerLight.className}`}
            style={{
              height: "700px",
              backgroundColor: "#160c06c0",
              color: "white",
              fontSize: "83px",
              fontWeight: 300,
              letterSpacing: "12px",
              textAlign: "center",
              lineHeight: "700px",
              verticalAlign: "middle",
            }}
          >
            <div
              style={{
                display: "inline-block",
                textAlign: "center",
                width: "fit-content",
                margin: "auto",
                lineHeight: 1.8,
              }}
            >
              <span
                className={`d-inline-block animate__animated ${animStateTop}`}
                style={{ animationDuration: "0.3s" }}
              >
                {"EMBRACE "}
                <span
                  data-stylerecorder="true"
                  className={playfairDisplay.className}
                  style={{
                    color: "#be9667",
                    textAlign: "left",
                    lineHeight: "25px",
                    letterSpacing: "3px",
                    marginLeft: "-25px",
                    marginRight: "-10px",
                    fontSize: "70px",
                    fontStyle: "italic",
                  }}
                >
                  Your
                </span>
                {" STYLE"}
              </span>
              <br />
              <ButtonCustom
                className={`animate__animated ${animStateBottom}`}
                style={{
                  margin: "auto",
                  padding: "2.136em 3.4em",
                  animationDelay: "0.3s",
                  animationDuration: "0.3s",
                }}
              >
                Book your appoinment
              </ButtonCustom>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item style={{ position: "relative" }}>
          <div
            className={`${butlerLight.className} animate__fadeInDown`}
            style={{
              height: "700px",
              backgroundColor: "#160c06c0",
              color: "white",
              fontSize: "83px",
              fontWeight: 300,
              letterSpacing: "12px",
              textAlign: "center",
              lineHeight: "700px",
              verticalAlign: "middle",
            }}
          >
            <div
              style={{
                display: "inline-block",
                textAlign: "center",
                width: "fit-content",
                margin: "auto",
                lineHeight: 1.8,
              }}
            >
              <span
                className={`d-inline-block animate__animated ${animStateTop}`}
                style={{ animationDuration: "0.4s" }}
              >
                {"CUSTOM "}
                <span
                  data-stylerecorder="true"
                  className={playfairDisplay.className}
                  style={{
                    color: "#be9667",
                    textAlign: "left",
                    lineHeight: "25px",
                    letterSpacing: "3px",
                    marginLeft: "-25px",
                    marginRight: "-10px",
                    fontSize: "70px",
                    fontStyle: "italic",
                  }}
                >
                  Made
                </span>
                {" SUITS"}
              </span>
              <br />
              <ButtonCustom
                className={`animate__animated ${animStateBottom}`}
                style={{
                  margin: "auto",
                  padding: "2.136em 3.4em",
                  animationDelay: "0.4s",
                  animationDuration: "0.4s",
                }}
              >
                Discover more
              </ButtonCustom>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item style={{ position: "relative" }}>
          <div
            className={`${butlerLight.className} animate__fadeInDown`}
            style={{
              height: "700px",
              backgroundColor: "#160c06c0",
              color: "white",
              fontSize: "83px",
              fontWeight: 300,
              letterSpacing: "12px",
              textAlign: "center",
              lineHeight: "700px",
              verticalAlign: "middle",
            }}
          >
            <div
              style={{
                display: "inline-block",
                textAlign: "center",
                width: "fit-content",
                margin: "auto",
                lineHeight: 1.8,
              }}
            >
              <span
                className={`d-inline-block animate__animated ${animStateTop}`}
                style={{ animationDuration: "0.4s" }}
              >
                {"STYLES "}
                <span
                  data-stylerecorder="true"
                  className={playfairDisplay.className}
                  style={{
                    color: "#be9667",
                    textAlign: "left",
                    lineHeight: "25px",
                    letterSpacing: "3px",
                    marginLeft: "-25px",
                    marginRight: "-10px",
                    fontSize: "70px",
                    fontStyle: "italic",
                  }}
                >
                  And
                </span>
                {" TRENDS"}
              </span>
              <br />
              <ButtonCustom
                className={`animate__animated ${animStateBottom}`}
                style={{
                  margin: "auto",
                  padding: "2.136em 3.4em",
                  animationDuration: "0.4s",
                }}
              >
                View our blog
              </ButtonCustom>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
      <MainContainer>
        <MainRow className="py-28 gap-5">
          <Col>
            <Image
              width={450}
              height={521}
              src="/images/2-layers.jpg"
              alt=""
              fetchPriority="high"
            />
          </Col>
          <Col>
            <h2
              className={`${butlerRegular.className} text-[color:#160c06] font-medium text-5xl/snug tracking-widest`}
            >
              DISCOVER TRUE QUALITY
            </h2>
            <DecoratedTitle
              className="mt-6"
              titleClassName="text-brown-back"
              titleStyle={{ fontWeight: 700, fontSize: "0.65rem" }}
              twoSideĐecorLine="right"
            >
              HANDCRAFTED SUIT
            </DecoratedTitle>
            <p className="mt-11" style={{ lineHeight: 2, fontSize: "11px" }}>
              WE PROVIDE YOU WITH GREAT SUITS THAT BEFIT YOU AND YOUR LIFESTYLE.
              OUR SUITS ARE MADE FROM THE HIGHEST QUALITY FABRICS AND GUARANTEED
              TO GIVE YOU FUNCTIONALITY, DURABILITY AND COMFORT. OUR SKILLED
              MASTER TAILORS HANDLE ALL OF OUR CUTTING AND SEWING, ENSURING
              PRECISION IN ALL PRODUCTION PROCESSES AND PAYING ATTENTION TO THE
              DETAILS. COME TO US AND CHOOSE THE BEST SUIT FOR YOUR LIFESTYLE.
            </p>
            <ButtonCustom className="px-5 py-4 mt-[60px]">
              LEARN ABOUT US
            </ButtonCustom>
          </Col>
        </MainRow>
        <MainRow className="py-28 bg-[#f9f8f8]" isOverflowed>
          <Col>
            <Row className="mb-16">
              <Col className="text-center">
                <DecoratedTitle
                  className="mt-6"
                  titleClassName="text-nav-link-hover"
                  titleStyle={{ fontWeight: 700, fontSize: "0.7rem" }}
                >
                  OUR SERVICES
                </DecoratedTitle>
              </Col>
            </Row>
            <Row className="gap-3 flex-nowrap overflow-x-auto">
              <Col className="text-center">
                <Image
                  width={400}
                  height={400}
                  src="/images/service-1-400x400.jpg"
                  alt="Can't not load image"
                  className="rounded-full mb-4 mx-auto"
                  style={{ width: "80%" }}
                />
                <h6
                  className={`${butlerRegular.className} text-[color:#160c06] font-semibold text-3xl/snug tracking-widest uppercase`}
                >
                  CUSTOM ACCESSORIES
                </h6>
                <p className="py-5 opacity-80">
                  We have a wide range of bow ties which fit everyday fashion as
                  well as special occasions
                </p>
                <ButtonCustom className="px-4 py-3 mx-auto" isOutline>
                  DISCOVER
                </ButtonCustom>
              </Col>
              <Col className="text-center">
                <Image
                  width={400}
                  height={400}
                  src="/images/service-4-400x400.jpg"
                  alt="Can't not load image"
                  className="rounded-full mb-4 mx-auto"
                  style={{ width: "80%" }}
                />
                <h6
                  className={`${butlerRegular.className} text-[color:#160c06] font-semibold text-3xl/snug tracking-widest uppercase`}
                >
                  CUSTOM TAILORING
                </h6>
                <p className="py-5 opacity-80">
                  You can choose all details you want, from buttons to pockets
                  and lapels, we can do everything.
                </p>
                <ButtonCustom className="px-4 py-3 mx-auto" isOutline>
                  DISCOVER
                </ButtonCustom>
              </Col>
              <Col className="text-center">
                <Image
                  width={400}
                  height={400}
                  src="/images/service-2-400x400.jpg"
                  alt="Can't not load image"
                  className="rounded-full mb-4 mx-auto"
                  style={{ width: "80%" }}
                />
                <h6
                  className={`${butlerRegular.className} text-[color:#160c06] font-semibold text-3xl/snug tracking-widest uppercase`}
                >
                  SUIT FOR RESIZING
                </h6>
                <p className="py-5 opacity-80">
                  Each our suit is made to your exact measurements and fit your
                  specific body type
                </p>
                <ButtonCustom className="px-4 py-3 mx-auto" isOutline>
                  DISCOVER
                </ButtonCustom>
              </Col>
              <Col className="text-center">
                <Image
                  width={400}
                  height={400}
                  src="/images/service-3-400x400.jpg"
                  alt="Can't not load image"
                  className="rounded-full mb-4 mx-auto"
                  style={{ width: "80%" }}
                />
                <h6
                  className={`${butlerRegular.className} text-[color:#160c06] font-semibold text-3xl/snug tracking-widest uppercase`}
                >
                  WEDDING SERVICES
                </h6>
                <p className="py-5 opacity-80">
                  You and your groomsmen deserve the sharpest suits. Let us help
                  you create suits for your day.
                </p>
                <ButtonCustom className="px-4 py-3 mx-auto" isOutline>
                  DISCOVER
                </ButtonCustom>
              </Col>
            </Row>
          </Col>
        </MainRow>
        <MainRow
          className="px-10 py-32"
          style={{
            backgroundSize: "cover",
            backgroundImage: "url(/images/background-14.jpg)",
          }}
          isOverflowed
        >
          <Col xs={8}>
            <p
              className={`${butlerRegular.className} text-white font-medium text-4xl tracking-wider`}
            >
              YOUR DESIGN, WE DELIVER
            </p>
            <DecoratedTitle
              twoSideĐecorLine="left"
              className="text-brown-back mt-4"
              titleStyle={{ letterSpacing: 0, fontWeight: 300 }}
            >
              Providing you with maximum level of comfort & confidence in every
              suit!
            </DecoratedTitle>
          </Col>
          <Col xs={4}>
            <Row className="justify-end items-center h-full">
              <ButtonCustom
                className="px-5 py-3"
                style={{ width: "fit-content" }}
              >
                BOOK YOUR CHOICE NOW
              </ButtonCustom>
            </Row>
          </Col>
        </MainRow>
        <MainRow className="py-28 gap-8">
          <Col>
            <iframe
              style={{ width: "100%", height: "100%" }}
              src="https://www.youtube.com/embed/0b_9wOmgiIA?si=uQIdK-9i1gsJZfmK"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </Col>
          <Col>
            <h2
              className={`${butlerRegular.className} text-[color:#160c06] font-medium text-5xl/snug tracking-widest`}
            >
              LYNETTE IN THE MAGIC SHOW
            </h2>
            <DecoratedTitle
              className="mt-6"
              titleClassName="text-brown-back"
              titleStyle={{ fontWeight: 700, fontSize: "0.65rem" }}
              twoSideĐecorLine="right"
            >
              HANDCRAFTED SUIT
            </DecoratedTitle>
            <p className="mt-11" style={{ lineHeight: 2, fontSize: "11px" }}>
              WE INVITE YOU TO FOLLOW US ON OUR SOCIAL MEDIA CHANNELS FOR THE
              LATEST NEWS AND EVENT UPDATES! BE KEPT UP TO DATE WITH THE
              FRESHEST IDEAS OF PETER MASON AND HIS TALENTED TEAM, NO MATTER
              WHERE YOU ARE IN THE WORLD.
            </p>
            <ButtonCustom className="px-5 py-4 mt-[60px]">
              LEARN ABOUT US
            </ButtonCustom>
          </Col>
        </MainRow>
        <MainRow className="py-28 bg-[#f9f8f8]" isOverflowed>
          <Col>
            <Row>
              <h2
                className={`${butlerRegular.className} text-[color:#160c06] font-medium text-5xl/snug tracking-widest text-center`}
              >
                READY FOR SHOPPING
              </h2>
            </Row>
            <Row className="mb-16">
              <Col className="text-center">
                <DecoratedTitle
                  className="mt-6"
                  titleClassName="text-nav-link-hover"
                  titleStyle={{ fontWeight: 700, fontSize: "0.7rem" }}
                >
                  ONLINE STORE
                </DecoratedTitle>
              </Col>
            </Row>
            <Row className="gap-3 flex-nowrap overflow-x-auto">
              <Col className="text-center">
                <Image
                  width={351}
                  height={351}
                  src="/images/product-1-351x351.jpg"
                  alt="Can't not load image"
                  className="mb-4 mx-auto"
                  style={{ width: "80%" }}
                />
                <h6
                  className={`${butlerRegular.className} font-semibold text-lg/snug tracking-widest color-[#000]`}
                >
                  Slim Fit 2pc Black Mini Checkered Suit
                </h6>
                <p className="py-3 font-medium opacity-80">$400.00 – $459.00</p>
                <ButtonCustom className="px-4 py-3 mx-auto" isOutline>
                  BUY NOW
                </ButtonCustom>
              </Col>
              <Col className="text-center">
                <Image
                  width={351}
                  height={351}
                  src="/images/product-2-351x351.jpg"
                  alt="Can't not load image"
                  className="mb-4 mx-auto"
                  style={{ width: "80%" }}
                />
                <h6
                  className={`${butlerRegular.className} font-semibold text-lg/snug tracking-widest color-[#000]`}
                >
                  Modern Fit 2pc Ultra Black Suit
                </h6>
                <p className="py-3 font-medium opacity-80">$300.00 – $329.00</p>
                <ButtonCustom className="px-4 py-3 mx-auto" isOutline>
                  BUY NOW
                </ButtonCustom>
              </Col>
              <Col className="text-center">
                <Image
                  width={351}
                  height={351}
                  src="/images/product-3-351x351.jpg"
                  alt="Can't not load image"
                  className="mb-4 mx-auto"
                  style={{ width: "80%" }}
                />
                <h6
                  className={`${butlerRegular.className} font-semibold text-lg/snug tracking-widest color-[#000]`}
                >
                  Slim Fit 3pc Solid Blue Suit
                </h6>
                <p className="py-3 font-medium opacity-80">$600.00 – $609.00</p>
                <ButtonCustom className="px-4 py-3 mx-auto" isOutline>
                  BUY NOW
                </ButtonCustom>
              </Col>
              <Col className="text-center">
                <Image
                  width={351}
                  height={351}
                  src="/images/product-4-351x351.jpg"
                  alt="Can't not load image"
                  className="mb-4 mx-auto"
                  style={{ width: "80%" }}
                />
                <h6
                  className={`${butlerRegular.className} font-semibold text-lg/snug tracking-widest color-[#000]`}
                >
                  Traditional Fit 2pc Brown Suit
                </h6>
                <p className="py-3 font-medium opacity-80">$500.00 – $530.00</p>
                <ButtonCustom className="px-4 py-3 mx-auto" isOutline>
                  BUY NOW
                </ButtonCustom>
              </Col>
            </Row>
          </Col>
        </MainRow>
        <MainRow
          className="py-32"
          style={{
            backgroundSize: "cover",
            backgroundImage: "url(/images/background-16.jpg)",
          }}
          isOverflowed
        >
          <Col xs={9}>
            <p
              className={`${butlerRegular.className} text-white font-medium text-5xl tracking-wider`}
            >
              THE LATEST STYLES & TRENDS
            </p>
            <DecoratedTitle
              twoSideĐecorLine="left"
              className="text-brown-back mt-4"
              titleStyle={{
                letterSpacing: 0,
                fontWeight: 300,
                fontSize: "20px",
              }}
            >
              From shirts to formal wear we customize everything imaginable!
            </DecoratedTitle>
          </Col>
          <Col xs={3}>
            <Row className="justify-end items-center h-full">
              <ButtonCustom
                className="px-5 py-3"
                style={{ width: "fit-content" }}
              >
                VIEW OUR COLLECTIONS
              </ButtonCustom>
            </Row>
          </Col>
        </MainRow>
        <MainRow className="pt-28 pb-24">
          <Col>
            <Row className="gap-5">
              <Col className="flex justify-between gap-3">
                <Image
                  alt="Can't load image"
                  width={235}
                  height={396}
                  src="/images/background-17.jpg"
                />
                <iframe
                  src="https://maps.google.com/maps?t=m&amp;output=embed&amp;iwloc=near&amp;z=14&amp;q=350+5th+Ave%2C+New+York%2C+NY+10118%2C+USA"
                  aria-label=""
                  className="w-full h-full"
                ></iframe>
              </Col>
              <Col xs={5}>
                <h2
                  className={`${butlerRegular.className} text-[color:#160c06] font-medium text-5xl/snug tracking-widest`}
                >
                  CONTACT INFO
                </h2>
                <p
                  className="mt-11"
                  style={{ lineHeight: 2, fontSize: "15px", color: "#757575" }}
                >
                  Have a question? Our team always ready to help. Feel free and
                  come to us anytime, we are glad to see you at our studio.
                </p>
                <p
                  className="mt-6 flex justify-start items-center gap-3"
                  style={{ lineHeight: 2, fontSize: "15px", color: "#757575" }}
                >
                  <MdLocationPin size={26} color="#be9667" /> 2277 Lorem Ave.,
                  San Diego, CA 22553
                </p>
                <p
                  className="mt-1 flex justify-start items-center gap-3"
                  style={{ lineHeight: 2, fontSize: "15px", color: "#757575" }}
                >
                  <MdOutlineWatchLater size={26} color="#be9667" /> Monday -
                  Friday: 10 am - 10pm <br />
                  Sunday: 11 am - 9pm
                </p>
                <p
                  className="mt-1 flex justify-start items-center gap-3"
                  style={{ lineHeight: 2, fontSize: "15px", color: "#757575" }}
                >
                  <MdOutlinePhonelinkRing size={26} color="#be9667" /> 123 - 456
                  - 7890
                </p>
              </Col>
            </Row>
            <Row className="mt-12 px-5 py-12 border-t-[1px] border-b-[1px] border-y-[color:#e8d7c2]">
              <Nav
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.3em",
                  alignItems: "center",
                }}
              >
                <Col className="text-center">
                  <Nav.Link
                    className="text-nav-link-hover text-base tracking-normal hover:text-brown-back w-auto flex justify-center items-center gap-3"
                    href="https://www.facebook.com/"
                  >
                    <MdFacebook size={30} /> Find us on Facebook
                  </Nav.Link>
                </Col>
                <Col className="text-center">
                  <Nav.Link
                    className="text-nav-link-hover text-base tracking-normal hover:text-brown-back w-auto flex justify-center items-center gap-3"
                    href="https://twitter.com/"
                  >
                    <BsTwitter size={30} /> Follow Us on Twitter
                  </Nav.Link>
                </Col>
                <Col className="text-center">
                  <Nav.Link
                    className="text-nav-link-hover text-base tracking-normal hover:text-brown-back w-auto flex justify-center items-center gap-3"
                    href="https://www.instagram.com/"
                  >
                    <BsInstagram size={30} /> Follow Us on Instagram
                  </Nav.Link>
                </Col>
              </Nav>
            </Row>
          </Col>
        </MainRow>
        <MainRow className="py-9 bg-[#160c06] text-light" isOverflowed>
          <Col className="text-center">
            BTAWebApp © 2023 All Rights Reserved. Terms of Use and Privacy
            Policy
          </Col>
        </MainRow>
      </MainContainer>
    </main>
  );
}
