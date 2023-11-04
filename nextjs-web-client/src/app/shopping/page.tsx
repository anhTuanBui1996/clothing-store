"use client";
import ShopItemCard from "@/components/common/ShopItemCard/ShopItemCard";
import SliderCustom from "@/components/common/SliderCustom/SliderCustom";
import MainContainer from "@/components/layout/MainContainer/MainCustom";
import MainRow from "@/components/layout/MainRow/MainRow";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";

export default function Page() {
  return (
    <main className="shopping-page">
      <MainContainer>
        <MainRow className="py-20">
          <Col xs={4} className="bg-[#f9f8f8]">
            <Row className="border-b border-b-[#e8d7c2]">
              <Col className="p-5">
                <h6 className="font-semibold text-sm tracking-widest uppercase">
                  Filter by price
                </h6>
                <SliderCustom className="py-7" />
              </Col>
            </Row>
            <Row className="border-y border-y-[#e8d7c2]">
              <Col className="p-5">
                <h6 className="font-semibold text-sm tracking-widest uppercase">
                  Category
                </h6>
                <ul className="mt-3 group">
                  <li
                    className="py-1 before:content-['\2022'] hover:text-nav-link-hover before:text-brown-back before:w-4 before:inline-block before:font-semibold"
                    style={{ listStyle: "none" }}
                  >
                    <Link href="/">Test</Link>
                  </li>
                  <li
                    className="py-1 before:content-['\2022'] hover:text-nav-link-hover before:text-brown-back before:w-4 before:inline-block before:font-semibold"
                    style={{ listStyle: "none" }}
                  >
                    <Link href="/">Test</Link>
                  </li>
                  <li
                    className="py-1 before:content-['\2022'] hover:text-nav-link-hover before:text-brown-back before:w-4 before:inline-block before:font-semibold"
                    style={{ listStyle: "none" }}
                  >
                    <Link href="/">Test</Link>
                  </li>
                </ul>
              </Col>
            </Row>
            <Row className="border-y border-y-[#e8d7c2]">
              <Col className="p-5">
                <h6 className="font-semibold text-sm tracking-widest uppercase">
                  Brand
                </h6>
                <ul className="mt-3 group">
                  <li
                    className="py-1 before:content-['\2022'] hover:text-nav-link-hover before:text-brown-back before:w-4 before:inline-block before:font-semibold"
                    style={{ listStyle: "none" }}
                  >
                    <Link href="/">Test</Link>
                  </li>
                  <li
                    className="py-1 before:content-['\2022'] hover:text-nav-link-hover before:text-brown-back before:w-4 before:inline-block before:font-semibold"
                    style={{ listStyle: "none" }}
                  >
                    <Link href="/">Test</Link>
                  </li>
                  <li
                    className="py-1 before:content-['\2022'] hover:text-nav-link-hover before:text-brown-back before:w-4 before:inline-block before:font-semibold"
                    style={{ listStyle: "none" }}
                  >
                    <Link href="/">Test</Link>
                  </li>
                </ul>
              </Col>
            </Row>
            <Row className="border-t border-t-[#e8d7c2]">
              <Col className="p-5">
                <h6 className="font-semibold text-sm tracking-widest uppercase">
                  Tags
                </h6>
                <ul className="mt-3 group">
                  <li
                    className="py-1 before:content-['\2022'] hover:text-nav-link-hover before:text-brown-back before:w-4 before:inline-block before:font-semibold"
                    style={{ listStyle: "none" }}
                  >
                    <Link href="/">Test</Link>
                  </li>
                  <li
                    className="py-1 before:content-['\2022'] hover:text-nav-link-hover before:text-brown-back before:w-4 before:inline-block before:font-semibold"
                    style={{ listStyle: "none" }}
                  >
                    <Link href="/">Test</Link>
                  </li>
                  <li
                    className="py-1 before:content-['\2022'] hover:text-nav-link-hover before:text-brown-back before:w-4 before:inline-block before:font-semibold"
                    style={{ listStyle: "none" }}
                  >
                    <Link href="/">Test</Link>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row className="mb-5">
              <Col>
                <ShopItemCard noBorder title="Test" priceString="Test string" />
              </Col>
              <Col>
                <ShopItemCard noBorder title="Test" priceString="Test string" />
              </Col>
            </Row>
            <Row className="mb-5">
              <Col>
                <ShopItemCard noBorder title="Test" priceString="Test string" />
              </Col>
              <Col>
                <ShopItemCard noBorder title="Test" priceString="Test string" />
              </Col>
            </Row>
          </Col>
        </MainRow>
      </MainContainer>
    </main>
  );
}
