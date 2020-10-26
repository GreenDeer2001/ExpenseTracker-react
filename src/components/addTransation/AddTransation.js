import React from "react";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Form from "react-bootstrap/Form";
import "./AddTransation.css";

const setDate = () => {
  let dateObj = new Date();
  let month = String(dateObj.getMonth()+1).padStart(2, "0");
  let day = String(dateObj.getDate()).padStart(2, "0");
  let year = dateObj.getFullYear();
  let output = year + "-" + month + "-" + day;

  return output;
};

const AddTransation = (props) => {
  const [today, setTransationDate] = React.useState(setDate);
  const [type, setType] = React.useState(true);

  const formValidation = (e) => {
    e.preventDefault();

    const title = document.getElementById("addTitle");
    !validationHandler(title.value)
      ? title.classList.add("notValid")
      : title.classList.remove("notValid");
    const amount = document.getElementById("amount");

    !validationHandler(amount.value)
      ? amount.classList.add("notValid")
      : amount.classList.remove("notValid");

    const description = document.getElementById("addDescription");
    const category = document.getElementById("addCategory");
    const date = document.getElementById("addData");

    validationHandler(title.value) &&
      validationHandler(amount.value) &&
      props.addHandler({
        title: title.value,
        description: description.value,
        category: +category.value,
        date: date.value,
        type: type,
        amount: +amount.value,
        id: Date.now(),
      });
  };
  const validationHandler = (value) => {
    value = value.trim();
    if (
      value === null ||
      value === undefined ||
      value === "" ||
      value === " "
    ) {
      return false;
    } else {
      return true;
    }
  };

  const changeDate = (newDate) => {
    setTransationDate(newDate);
  };

  const switchBtnHandler = (e) => {
    e.preventDefault();
    document.getElementById("przychod").classList.remove("active");
    document.getElementById("wydatek").classList.remove("active");

    e.target.classList.add("active");

    if (e.target.classList.contains("left")) {
      setType(true);
    } else {
      setType(false);
    }
  };

  const closeForm = (e)=>{
    e.preventDefault()
    props.closeForm();

  }

  const category = props.categories.map(category =>{
    if(category.id !== 0){
      return(
        <option key={category.id} value={category.id}>{category.text}</option>)
    }
    return null
  })

  return (
    <React.Fragment>
      <Backdrop close={props.closeForm} />
      <div className="addTransation">
        <Form className="bg-white  addForm rounded">
        <button
            id="closeForm"
            className="text-danger"
            type="submit"
            onClick={(e) => closeForm(e)}
          >
            X
          </button>
          <Form.Control
            size="lg"
            type="text"
            placeholder="Tytuł"
            id="addTitle"
          />
          <br />
          {/* <Form.Label>Opis</Form.Label> */}
          <Form.Control id="addDescription" placeholder="opis" as="textarea" rows={3} />
          <br />
          <div className="button-switch-container">
            <button
              id="przychod"
              onClick={(e) => switchBtnHandler(e)}
              className="button-switch active left text-success"
            >
              Przychód
            </button>
            <button
              id="wydatek"
              onClick={(e) => switchBtnHandler(e)}
              className="button-switch right text-danger"
            >
              Wydatek
            </button>
          </div>
          <br />
          <Form.Control
            size="lg"
            type="number"
            placeholder="kwota(zł)"
            id="amount"
          />
          <br />
          <Form.Group controlId="addCategory">
            <Form.Control as="select" size="lg" custom>
            
              {category}
            </Form.Control>
          </Form.Group>

          <Form.Control
            size="lg"
            type="date"
            value={today}
            onChange={(e) => changeDate(e.target.value)}
            id="addData"
          />
          <br />

          <button
            id="addBtn"
            className="text-success"
            type="submit"
            onClick={(e) => formValidation(e)}
          >
            Potwierdz
          </button>
        </Form>
      </div>
    </React.Fragment>
  );
};

export default AddTransation;
