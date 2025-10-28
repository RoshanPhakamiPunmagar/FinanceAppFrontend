import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SignupForm from "../components/SignupForm";

const Signup = () => {
  return (
    <Container className="p-2">
      <Row>
        <Col md={6}>Decoration</Col>
        <Col md={6}>
          <SignupForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
