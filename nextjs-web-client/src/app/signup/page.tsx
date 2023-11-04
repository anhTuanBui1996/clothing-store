"use client";
import ButtonCustom from "@/components/common/ButtonCustom/ButtonCustom";
import Link from "next/link";
import React from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { Playfair_Display } from "next/font/google";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

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
                  Sign up your account
                </Card.Title>
                <Form>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label className="font-semibold">Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label className="font-semibold">Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label className="font-semibold">Confirm password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                  <ButtonCustom className="py-3 w-full justify-center">
                    <span>Sign Up</span>
                  </ButtonCustom>
                  <div className="text-center py-2">Or</div>
                  <div className="flex justify-between gap-3">
                    <ButtonCustom
                      className="py-3 w-full justify-center"
                      style={{ backgroundColor: "#fff" }}
                      hoverStyle={{ backgroundColor: "#a7a7a7" }}
                    >
                      <span className="flex justify-start items-center text-[#be9667]">
                        Sign In with <FcGoogle className="ml-1" size={20} />
                      </span>
                    </ButtonCustom>
                    <ButtonCustom
                      className="py-3 w-full justify-center"
                      style={{
                        backgroundColor: "#0866ff",
                        borderColor: "#0866ff",
                      }}
                    >
                      <span className="flex justify-start items-center">
                        Sign In with <BsFacebook className="ml-1" size={20} />
                      </span>
                    </ButtonCustom>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Row>
        </Col>
      </Container>
    </main>
  );
}
