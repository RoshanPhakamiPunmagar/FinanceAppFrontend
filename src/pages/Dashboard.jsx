import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AiChat from "../AI/AiChat.jsx";

const Dashboard = () => {
  return (
    <Container className="mt-4">
      <Row>
        <Col md={8} className="mx-auto">
          <AiChat />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
