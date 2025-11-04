import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form, Spinner } from "react-bootstrap";
import CustomInput from "./CustomInput";
import axios from "axios";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router";

const LoginForm = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { color, toggleColor } = useTheme();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const inputFields = [
    {
      placeholder: "Enter your email",
      type: "email",
      label: "Email",
      inputid: "EmailInput",
      name: "email",
      value: form.email,
    },
    {
      placeholder: "Enter your password",
      type: "password",
      label: "Password",
      inputid: "PasswordInput",
      name: "password",
      value: form.password,
    },
  ];

  const onChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://financeapp-1-1myj.onrender.com/api/v1/login",
        form
      );

      toast[response.data.status](response.data.message);

      if (response.data.status === "success") {
        localStorage.setItem("accessJWT", response.data.token);
        setUser(response.data.user);
        navigate("/transaction");
      }
    } catch (error) {
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const goBack = location?.state?.from?.location?.pathname || "/transaction";

  useEffect(() => {
    if (user?._id) {
      navigate(goBack);
    }
  }, [user?._id]);

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100 bg-dark text-white"
    >
      <Card
        className="p-5 shadow-lg rounded-4 bg-gradient text-white"
        style={{
          maxWidth: "420px",
          width: "100%",
          background:
            color === "dark"
              ? "linear-gradient(145deg, #1c1c1c, #2a2a2a)"
              : "linear-gradient(145deg, #f8f9fa, #e9ecef)",
        }}
      >
        <h2 className="text-center mb-4 text-info fw-bold">Welcome Back </h2>
        <p className="text-center text-secondary mb-4">
          Log in to manage your finances smartly
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
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </Form>

        <div className="text-center mt-4">
          <p className="text-secondary">
            Don’t have an account?
            <Button
              variant="link"
              className="text-info text-decoration-none ms-1"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </Button>
          </p>
        </div>
      </Card>
    </Container>
  );
};

export default LoginForm;
