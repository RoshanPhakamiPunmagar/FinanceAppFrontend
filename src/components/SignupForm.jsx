import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import CustomInput from "./CustomInput";
import axios from "axios";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";

const SignupForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [loading, setLoading] = useState(false);

  const { color } = useTheme();

  const inputFields = [
    {
      placeholder: "Enter your name",
      type: "text",
      label: "Full Name",
      inputid: "nameInput",
      name: "name",
      value: form.name,
    },
    {
      placeholder: "Enter your email",
      type: "email",
      label: "Email Address",
      inputid: "emailInput",
      name: "email",
      value: form.email,
    },
    {
      placeholder: "******",
      type: "password",
      label: "Password",
      inputid: "passwordInput",
      name: "password",
      value: form.password,
    },
    {
      placeholder: "******",
      type: "password",
      label: "Confirm Password",
      inputid: "cpasswordInput",
      name: "cpassword",
      value: form.cpassword,
    },
  ];

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (form.password !== form.cpassword) {
      return toast.error("Passwords do not match!");
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://financeapp-1-1myj.onrender.com/api/v1/users",
        form
      );
      toast[data.status](data.message);
    } catch (error) {
      toast.error("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100 bg-dark text-white"
    >
      <Card
        className="p-5 shadow-lg rounded-4 text-white bg-gradient"
        style={{
          maxWidth: "450px",
          width: "100%",
          background: "linear-gradient(145deg, #1c1c1c, #2a2a2a)",
        }}
      >
        <h2 className="text-center mb-3 text-info fw-bold">
          Create Your Account
        </h2>
        <p className="text-center text-secondary mb-4">
          Join us to start tracking your finances effortlessly.
        </p>

        <Form onSubmit={handleOnSubmit}>
          {inputFields.map((item, i) => (
            <div key={i} className="mb-3">
              <CustomInput {...item} onChange={onChange} />
            </div>
          ))}

          <div className="d-grid mt-3">
            <Button
              variant="info"
              type="submit"
              size="lg"
              className="fw-bold rounded-pill"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    animation="border"
                    size="sm"
                    className="me-2"
                    role="status"
                  />
                  Creating Account...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </div>
        </Form>

        <div className="text-center mt-4">
          <p className="text-secondary">
            Already have an account?
            <Button
              variant="link"
              className="text-info text-decoration-none ms-1"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </p>
        </div>
      </Card>
    </Container>
  );
};
export default SignupForm;
