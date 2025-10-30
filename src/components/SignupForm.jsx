import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomInput from "./CustomInput";
import axios from "axios";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";

const SignupForm = () => {
  const [form, setForm] = useState({
    name: "test",
    email: "test@gmail.com",
    password: "test",
  });
  const inputFields = [
    {
      placeholder: "Name",
      type: "text",
      label: "Name",
      inputid: "NameInput",
      name: "name",
      value: form.name,
    },
    {
      placeholder: "Email",
      type: "email",
      label: "Email",
      inputid: "EmailInput",
      name: "email",
      value: form.email,
    },
    {
      placeholder: "******",
      type: "password",
      label: "Password",
      inputid: "PasswordInput",
      name: "password",
      value: form.password,
    },
    {
      placeholder: "******",
      type: "password",
      label: "Confirm Password",
      inputid: "cPasswordInput",
      name: "cpassword",
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

    let response = await axios.post(
      "https://financeapp-1-1myj.onrender.com/api/v1/users",
      form
    );

    console.log(response.data);
    toast[response.data.status](response.data.message);
  };

  const { color } = useTheme();

  return (
    <div className="border rounded-4 p-4 bg-dark text-white">
      <h1>Signup : {color}</h1>
      <hr />
      <Form onSubmit={handleOnSubmit}>
        {inputFields.map((item) => (
          <CustomInput {...item} onChange={onChange} />
        ))}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SignupForm;
