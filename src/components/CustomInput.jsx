import React from "react";
import { Form } from "react-bootstrap";

const CustomInput = ({
  placeholder,
  type,
  label,
  inputid,
  name,
  value,
  onChange,
}) => {
  return (
    <Form.Group className="mb-3" controlId={inputid}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />

      {/* <input type={type} value="test" placeholder={placeholder} name={name} /> */}
    </Form.Group>
  );
};

export default CustomInput;
