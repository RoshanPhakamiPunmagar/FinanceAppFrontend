import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomInput from "../components/CustomInput";
import axios from "axios";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router";

const AddTransaction = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    type: "income",
    amount: 100,
    date: "2025-10-12",
    description: "Salary",
  });
  const inputFields = [
    {
      placeholder: "Type",
      type: "text",
      label: "Type",
      inputid: "typeInput",
      name: "type",
      value: form.type,
    },
    {
      placeholder: "Amount",
      type: "number",
      label: "Amount",
      inputid: "amountInput",
      name: "amount",
      value: form.amount,
    },
    {
      placeholder: "Date",
      type: "date",
      label: "date",
      inputid: "dateInput",
      name: "date",
      value: form.date,
    },
    {
      placeholder: "description",
      type: "text",
      label: "Description",
      inputid: "descInput",
      name: "description",
      value: form.description,
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

    const token = localStorage.getItem("accessJWT");

    const response = await axios({
      method: "post",
      url: "http://localhost:3000/api/v1/transactions",
      data: form,
      headers: {
        Authorization: token,
      },
    });

    // let response = await axios.post("http://localhost:3000/api/v1/users", form);

    console.log(response.data);
    toast[response.data.status](response.data.message);

    if (response.data.status == "success") {
      navigate("/transaction");
    }
  };

  //const { color } = useTheme();

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="col-md-6">
        <div className="border rounded-4 p-4 bg-dark text-white shadow-lg">
          <h2 className="text-center mb-3">
            Add Transaction <span className="text-info"></span>
          </h2>
          <p className="text-center text-secondary mb-4">
            Fill in the details below to record your transaction
          </p>
          <hr className="border-light" />

          <Form onSubmit={handleOnSubmit}>
            {inputFields.map((item, index) => (
              <div key={index} className="mb-3">
                <CustomInput {...item} onChange={onChange} />
              </div>
            ))}

            <div className="d-grid mt-3">
              <Button
                variant="success"
                type="submit"
                size="lg"
                className="rounded-pill"
              >
                Save Transaction
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;
