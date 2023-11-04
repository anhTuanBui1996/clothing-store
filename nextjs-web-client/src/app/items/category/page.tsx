"use client";
import ItemWithBackground from "@/components/common/ItemWithBackground/ItemWithBackground";
import MainContainer from "@/components/layout/MainContainer/MainCustom";
import MainRow from "@/components/layout/MainRow/MainRow";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";

export default function Page() {
  return (
    <main className="shopping-page">
      <MainContainer>
        <MainRow className="py-20">
          <Col>
            <Row className="mb-1">
              <Col>
                <Link href="/items">
                  <ItemWithBackground
                    classNames={{ background: "py-20" }}
                    title="CATEGORY 1"
                    subTitle="Sub"
                    styles={{
                      title: { color: "#fff" },
                      subTitle: { color: "#fff" },
                    }}
                  />
                </Link>
              </Col>
            </Row>
            <Row className="mb-1">
              <Col>
                <Link href="/items">
                  <ItemWithBackground
                    classNames={{ background: "py-20" }}
                    title="CATEGORY 2"
                    subTitle="Sub"
                    styles={{
                      title: { color: "#fff" },
                      subTitle: { color: "#fff" },
                    }}
                  />
                </Link>
              </Col>
            </Row>
          </Col>
        </MainRow>
      </MainContainer>
    </main>
  );
}
