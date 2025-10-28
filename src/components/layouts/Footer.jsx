import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <Container fluid className="bg-dark p-5">
      <Row className="text-center text-white">
        <Col>&copy; Copy right all reserved. BTC-JUL-2025</Col>
      </Row>
    </Container>
  );
};

export default Footer;
