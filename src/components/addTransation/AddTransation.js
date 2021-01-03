import React, { useState, useRef } from "react";
import { useAppContext } from "../../context/AppContext";
import { setDate } from "./transationLogic";
import { Form, Modal, Button } from "react-bootstrap";

const AddTransation = () => {
  const [today, setTransationDate] = useState(setDate());
  const [type, setType] = useState(true);
  const {
    categories: categoriesContext,
    dispatch,
    showForm,
    setShowForm,
  } = useAppContext();

  const title = useRef();
  const amount = useRef();
  const description = useRef();
  const categoryRef = useRef();
  const date = useRef();
  const revBtn = useRef();
  const expBtn = useRef();

  const formValidation = (e) => {
    e.preventDefault();
    const obj = {
      title: title.current.value,
      description: description.current.value,
      category: +categoryRef.current.value,
      date: date.current.value,
      type: type,
      amount: +amount.current.value,
      id: Date.now(),
    };
    dispatch({ type: "SALDO", amount: obj.type ? obj.amount : -obj.amount });
    dispatch({ type: "ADD", transation: obj });
    setShowForm(false);
  };

  const categories = categoriesContext.map((category) => {
    if (category.id !== 0) {
      return (
        <option key={category.id} value={category.id}>
          {category.text}
        </option>
      );
    }
    return null;
  });

  return (
    <>
      <Modal
        show={showForm}
        size="lg"
        centered
        onHide={() => setShowForm(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Transation</Modal.Title>
        </Modal.Header>
        <Form onSubmit={formValidation}>
          <Modal.Body>
            <Form.Group>
              <Form.Control
                type="text"
                size="lg"
                placeholder="Title"
                required
                ref={title}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="textarea"
                ref={description}
                placeholder="Description"
                rows={3}
              />
            </Form.Group>
            <Form.Group>
              <Button
                ref={revBtn}
                variant={type ? "success" : "light"}
                onClick={() => setType(true)}
                className="border-success p-3 text-uppercase  w-50"
              >
                Revenue
              </Button>
              <Button
                ref={expBtn}
                variant={!type ? "danger" : "light"}
                onClick={() => setType(false)}
                className="border-danger p-3 text-uppercase  w-50"
              >
                Expenses
              </Button>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="number"
                size="lg"
                placeholder="Amount"
                required
                ref={amount}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control as="select" size="lg" ref={categoryRef} custom>
                {categories}
              </Form.Control>
            </Form.Group>

            <Form.Control
              type="date"
              value={today}
              size="lg"
              onChange={(e) => setTransationDate(e.target.value)}
              ref={date}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddTransation;
