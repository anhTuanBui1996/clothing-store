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
                    title="BRAND"
                    subTitle="All famouse clothing brands that we are collab with"
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
                    title="CATEGORY"
                    subTitle="The clothing categories we serve, you will like it"
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
