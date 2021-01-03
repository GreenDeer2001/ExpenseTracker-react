import React, { useState, useRef, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useAppContext } from "../../context/AppContext";

const EditForm = ({ obj }) => {
  const {
    showEditForm,
    categories: categoriesContext,
    setShowEditForm,
    dispatch,
  } = useAppContext();

  const [type, setType] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState(1);
  const [date, setDate] = useState("");
  const [id, setId] = useState(0);

  useEffect(() => {
    if (obj) {
      setTitle(obj.title);
      setDescription(obj.description);
      setAmount(obj.amount);
      setCategory(obj.category);
      setDate(obj.date);
      setId(obj.id);
    }
  }, [obj]);

  const titleRef = useRef();
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const dateRef = useRef();
  const revBtn = useRef();
  const expBtn = useRef();

  const removeTransation = () => {
    dispatch({ type: "REMOVE", ID: obj.id });
    setShowEditForm(false);
  };

  const editHandler = (e) => {
    e.preventDefault();
    const editedObj = {
      id,
      description,
      amount,
      category,
      title,
      date,
      type,
    };
    dispatch({ type: "EDIT", obj: editedObj });
    setShowEditForm(false);
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
        show={showEditForm}
        size="lg"
        centered
        onHide={() => setShowEditForm(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Transation</Modal.Title>
        </Modal.Header>
        <Form onSubmit={editHandler}>
          <Modal.Body>
            <Form.Group>
              <Form.Control
                type="text"
                size="lg"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                ref={titleRef}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="textarea"
                ref={descriptionRef}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                className="border-danger  p-3 text-uppercase w-50"
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
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                ref={amountRef}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="select"
                size="lg"
                value={category}
                ref={categoryRef}
                onChange={(e) => setCategory(e.target.value)}
                custom
              >
                {categories}
              </Form.Control>
            </Form.Group>

            <Form.Control
              type="date"
              value={date}
              size="lg"
              onChange={(e) => setDate(e.target.value)}
              ref={dateRef}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={removeTransation}>
              Remove Transation
            </Button>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default EditForm;
