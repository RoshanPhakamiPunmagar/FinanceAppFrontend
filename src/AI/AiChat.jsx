import React, { useState, useRef, useEffect } from "react";
import { Button, Card, Form, InputGroup, Spinner } from "react-bootstrap";
import axios from "axios";

const AiChat = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi! I'm your AI finance assistant. How can I help today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to the bottom when a new message arrives
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const token = localStorage.getItem("accessJWT");
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/ai/chat",
        { message: input },
        { headers: { Authorization: token } }
      );

      const botMessage = {
        sender: "bot",
        text: data.reply || "Sorry, I couldn’t understand that.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ AI is currently unavailable. Try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      className="bg-dark text-light shadow-lg rounded-4 p-3 mt-4"
      style={{ height: "500px" }}
    >
      <Card.Title className="text-center text-info mb-3 fs-4">
        💬 AI Finance Assistant
      </Card.Title>

      <div
        className="chat-window mb-3 p-3 rounded"
        style={{
          backgroundColor: "#1f1f1f",
          height: "370px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded ${
              msg.sender === "user"
                ? "bg-primary text-white align-self-end"
                : "bg-secondary text-light align-self-start"
            }`}
            style={{
              maxWidth: "80%",
              wordWrap: "break-word",
              borderRadius: "15px",
            }}
            dangerouslySetInnerHTML={{ __html: msg.text }}
          />
        ))}

        {loading && (
          <div className="text-center text-muted mt-2">
            <Spinner animation="border" size="sm" /> Thinking...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <Form onSubmit={sendMessage}>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Ask something about your finances..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-dark text-light border-secondary"
            disabled={loading}
          />
          <Button type="submit" variant="info" disabled={loading}>
            Send
          </Button>
        </InputGroup>
      </Form>
    </Card>
  );
};

export default AiChat;
