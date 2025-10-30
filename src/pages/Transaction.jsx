import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";

const Transaction = () => {
  const [totalAmount, setTotalAmount] = useState(100);
  const [transactionList, setTransactionList] = useState([
    {
      id: 1,
      date: "2025-10-11",
      description: "Salary",
      type: "income",
      amount: 10000,
    },
    {
      id: 2,
      date: "2025-10-12",
      description: "Salary",
      type: "income",
      amount: 10000,
    },
    {
      id: 3,
      date: "2025-10-13",
      description: "Grocery",
      type: "expense",
      amount: 10000,
    },
  ]);

  const [displayTransactionList, setDisplayTransactionList] = useState([]);

  const [search, setSearch] = useState("");

  const fetchTransaction = async () => {
    // api call
    const token = localStorage.getItem("accessJWT");

    const response = await axios({
      method: "get",
      url: "https://financeapp-1-1myj.onrender.com/api/v1/transactions?pageLimit=10",
      headers: {
        Authorization: token,
      },
    });

    console.log("Transaction fetch", response.data);

    if (response?.data?.status === "success") {
      setTransactionList(response.data.transactions);
    }
  };

  useEffect(() => {
    // fetch transaction
    fetchTransaction();
  }, []);

  // update display transaction
  useEffect(() => {
    setDisplayTransactionList(transactionList);
  }, [transactionList]);

  useEffect(() => {
    setTotalAmount(
      displayTransactionList.reduce((acc, item) => acc + item.amount, 0)
    );
  }, [displayTransactionList]);

  useEffect(() => {
    let filtereList = transactionList.filter(
      (item) =>
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.type.toLowerCase().includes(search.toLowerCase())
    );
    setDisplayTransactionList(filtereList);
  }, [search]);

  return (
    <Container className="rounded bg-dark p-5 text-white mt-4">
      <h1 className="">Transaction</h1>
      <hr />
      <Row>
        <Col>
          <span>{transactionList.length} Transaction/s Found</span>
        </Col>
        <Col>
          <input
            type="text"
            className="form-group"
            onChange={(event) => {
              console.log(event.target.value);
              setSearch(event.target.value);
            }}
          />
        </Col>
        <Col>
          <Button variant="primary">Add Transaction</Button>
        </Col>
      </Row>
      <Row>
        <Table hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>description</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {displayTransactionList.map((t, i) => {
              return (
                <>
                  <tr>
                    <td>{i + 1} </td>
                    <td>{t.date.split("T")[0]}</td>
                    <td>{t.description}</td>
                    <td>{t.type}</td>
                    <td
                      className={
                        t.type === "income" ? "text-success" : "text-danger"
                      }
                    >
                      ${t.amount}
                    </td>
                  </tr>
                </>
              );
            })}

            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>Total</td>
              <td>${totalAmount}</td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default Transaction;
