import React, { ReactNode } from "react";
import { Container } from "react-bootstrap";

export default function MainContainer({ children }: { children: ReactNode }) {
  return (
    <Container className="main-container px-48 mx-0 w-[100%] max-w-none">
      {children}
    </Container>
  );
}
