import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import LoginForm from "../components/LoginForm";

const Login = ({ color }) => {
  return (
    <Container className="p-2">
      <Row>
        <Col md={6}>
          <LoginForm color={color} />
        </Col>

        <Col md={6}>Decoration</Col>
      </Row>
    </Container>
  );
};

export default Login;
