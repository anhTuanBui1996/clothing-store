"use client";
import ButtonCustom from "@/components/common/ButtonCustom/ButtonCustom";
import Link from "next/link";
import React from "react";
import { Card, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Playfair_Display } from "next/font/google";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";

const playfairDisplay = Playfair_Display({
  weight: "400",
  style: "italic",
  subsets: ["latin", "cyrillic"],
});

export default function Page() {
  return (
    <main
      className="login-page"
      style={{
        backgroundImage: "url(/images/header_images.jpg)",
        backgroundPosition: "right",
        backgroundRepeat: "no-repeat",
        backgroundSize: "auto 100vh",
        height: "100vh",
      }}
    >
      <div
        className="mask-layer w-full h-full absolute"
        style={{ backgroundColor: "rgb(22 12 6 / 75%)" }}
      ></div>
      <Container className="h-full">
        <Col className="h-full px-40">
          <Row className="h-full py-32">
            <Card className="m-auto max-w-md">
              <Card.Body>
                <Card.Title
                  className={`text-center font-medium text-3xl mb-10 ${playfairDisplay.className}`}
                >
                  Retrieve the password
                </Card.Title>
                <Form action="/">
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label className="font-semibold">
                      Username or Email
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder="Enter email or username"
                      />
                      <InputGroup.Text>
                        <ButtonCustom isOutline className="p-2">
                          SEND
                        </ButtonCustom>
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label className="font-semibold">
                      Verify Code
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="xxxxxx"
                      maxLength={6}
                    />
                  </Form.Group>
                  <ButtonCustom className="py-3 w-full justify-center">
                    <span>GET THE PASSWORD</span>
                  </ButtonCustom>
                </Form>
              </Card.Body>
            </Card>
          </Row>
        </Col>
      </Container>
    </main>
  );
}
