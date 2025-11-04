import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Transaction = () => {
  const navigate = useNavigate();
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

  const [idsToDelete, setIdsToDelete] = useState([]);

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

  // func to delete transation
  const deleteTransaction = async (id) => {
    const token = localStorage.getItem("accessJWT");

    const response = await axios({
      method: "delete",
      url: "https://financeapp-1-1myj.onrender.com/api/v1/transactions/" + id,
      headers: {
        Authorization: token,
      },
    });
    toast[response.data.status](response.data.message);

    if (response.data.status == "success") {
      fetchTransaction();
    }
  };

  // handle buld delete
  const handleBulkDelete = async () => {
    // bulk delete api
    const token = localStorage.getItem("accessJWT");

    const response = await axios({
      method: "delete",
      url: "https://financeapp-1-1myj.onrender.com/api/v1/transactions",
      data: {
        ids: idsToDelete,
      },
      headers: {
        Authorization: token,
      },
    });
    toast[response.data.status](response.data.message);

    if (response.data.status == "success") {
      fetchTransaction();
    }
  };

  // update ids to delete
  const updateIdsToDelete = (id, state) => {
    console.log(id, state);
    // check if checked or not
    if (state) {
      // add to ids
      const tempIds = idsToDelete;
      tempIds.push(id);
      console.log(tempIds.length);

      setIdsToDelete(tempIds);
    } else {
      const tempIds = idsToDelete.filter((i) => i != id);
      console.log(tempIds.length);
      setIdsToDelete(tempIds);
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
          <Button
            variant="primary"
            onClick={() => {
              navigate("/add-transaction");
            }}
          >
            Add Transaction
          </Button>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {displayTransactionList.map((t, i) => {
              return (
                <tr key={i}>
                  <td>
                    {i + 1}{" "}
                    <Form.Check
                      inline
                      name="group1"
                      type="checkbox"
                      // id={`inline-${type}-1`}

                      onChange={(event) => {
                        updateIdsToDelete(t._id, event.target.checked);
                      }}
                    />
                  </td>
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
                  <td>
                    <Button
                      variant="danger"
                      className="ms-4"
                      onClick={() => {
                        // alert("DELETE THIS TRANSACTION" + t._id);
                        // call delete api

                        if (confirm("Delete ?")) {
                          deleteTransaction(t._id);
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}

            <tr key={"last-row"}>
              <td></td>
              <td></td>
              <td></td>
              <td>Total</td>
              <td>${totalAmount}</td>
            </tr>
          </tbody>
        </Table>
      </Row>
      <Row>
        <Col>
          <Button
            variant="danger"
            onClick={() => {
              handleBulkDelete();
            }}
          >
            {idsToDelete.length} Delete Selected
          </Button>
          {idsToDelete.length > 0 ? (
            <></>
          ) : (
            <>
              <div key={"no-delete"}></div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Transaction;
