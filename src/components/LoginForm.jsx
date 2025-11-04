import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomInput from "./CustomInput";
import axios from "axios";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router";

const LoginForm = () => {
  const { user, setUser } = useAuth();
  // navigation
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "test@gmail.com",
    password: "test",
  });
  const inputFields = [
    {
      placeholder: "Email",
      type: "email",
      label: "Email",
      inputid: "EmailInput",
      name: "email",
      value: form.email,
    },
    {
      placeholder: "Password",
      type: "password",
      label: "Password",
      inputid: "PasswordInput",
      name: "password",
      value: form.password,
    },
  ];

  const onChange = (event) => {
    console.log(event.target.value);
    console.log(event.target.name);

    if (event.target.name != "cpassword") {
      setForm({
        ...form,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleOnSubmit = async (event) => {
    // prevent the reload
    event.preventDefault();

    // ajax call
    // api call
    // fetch axios
    let response = await axios.post("http://localhost:3000/api/v1/login", form);

    console.log(response.data);
    toast[response.data.status](response.data.message);

    if (response.data.status == "success") {
      // save token to localstorage
      localStorage.setItem("accessJWT", response.data.token);

      // update user from auth context
      setUser(response.data.user);

      // navigate to transaction
      navigate("/transaction");
    }
  };

  // context
  const { color, toggleColor } = useTheme();

  const location = useLocation();
  console.log(22222, location);

  const goBack = location?.state?.from?.location?.pathname || "/transaction";

  useEffect(() => {
    if (user?._id) {
      // navigate to some pages
      // get the location where we came from
      navigate(goBack);
    }
  }, [user?._id]);

  return (
    <div className="border rounded-4 p-4 bg-dark text-white">
      <h1>Login : {color} </h1>
      <hr />
      <Form onSubmit={handleOnSubmit}>
        {/* <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group> */}
        {/* 
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group> */}

        {/* <CustomInput
          placeholder="test"
          type="number"
          label="customlabel"
          inputid="forminput"
          name="name"
        /> */}

        {inputFields.map((item) => (
          <CustomInput {...item} onChange={onChange} />
        ))}

        <Button variant="primary" type="submit">
          Submit
        </Button>

        <button onClick={toggleColor}>Toggle</button>
      </Form>
    </div>
  );
};

export default LoginForm;
