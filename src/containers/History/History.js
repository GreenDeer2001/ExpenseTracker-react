import React from "react";
import "./History.css";
import { Container, Form, Button,Modal } from "react-bootstrap";
import { FaHamburger } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import Backdrop from "../../UI/Backdrop/Backdrop";

const History = (props) => {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [curTransation,setCurTransation] = React.useState(null);

  const openEditon = (obj) =>{
    setOpenEdit(true)
    setCurTransation(obj)
  }

  const closeEditor = () =>{
    setOpenEdit(false)
  }

  const transationsToDisplay = props.transations.map((transation) => {
    const d = new Date(transation.date);
    if (
      d.getTime() > props.period &&
      (props.curCat === 0 || props.curCat === transation.category)
    ) {
      return (
        <div className="item" key={transation.id}>
          <div className="item-left-side">
            <FaHamburger className="item-icon category-icon" />
            <h3>{transation.title}</h3>
          </div>
          <div className="history-right">
            <div className="item-center">
              {transation.type ? (
                <h3 className="amount text-success">(+){transation.amount}</h3>
              ) : (
                <h3 className="amount text-danger">(-){transation.amount}</h3>
              )}
            </div>

            <div className="item-right-side">
              <h3>{transation.date}</h3>
              <button onClick={()=>openEditon(transation)} className="item-settings">
                <AiFillSetting className="item-icon" />
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  });
  return (
    <div>
      {openEdit && <EditForm closeEditor={closeEditor} obj={curTransation} editHandler={props.editHandler} categories={props.categories}/>}
      <ul className="items">{transationsToDisplay}</ul>
    </div>
  );
};


const EditForm = (props) => {


  const [type, setType] = React.useState(true);
  const [title,setTitle] = React.useState(props.obj.title);
  const [description,setDescription] = React.useState(props.obj.description);
  const [amount,setAmount] = React.useState(props.obj.amount);
  const [category,setCategory] = React.useState(props.obj.category);
  const [date,setDate] = React.useState(props.obj.date);

  const editHandler = (e) =>{
    e.preventDefault()

    const obj = props.obj;
    obj.description=description;
    obj.amount= +amount;
    obj.category=+category;
    obj.title=title;
    obj.date=date;
    obj.type=type;

    props.closeEditor();
    return(props.editHandler(obj))
  }

  const switchBtnHandler = (e) => {
    e.preventDefault();
    document.getElementById("edit-rev").classList.remove("active");
    document.getElementById("edit-exp").classList.remove("active");

    e.target.classList.add("active");

    if (e.target.classList.contains("left")) {
      setType(true);
    } else {
      setType(false);
    }
  };

  

  const categories = props.categories.map(category =>{
    if(category.id !== 0){
      return(
        <option key={category.id} value={category.id}>{category.text}</option>)
    }
    return null;
  })

  return (
    <>
    <Backdrop/>
    <Container  className="edit py-3 px-5  justify-content-center">
      <Modal.Dialog >
        <Modal.Header closeButton onClick={props.closeEditor} />
        <Modal.Body>


      <Form  className="bg-white  px-5 rounded">
        
        <Form.Control size="lg" type="text" value={title} onChange={(e)=>setTitle(e.target.value)}  required />
        <br />
        <Form.Control placeholder="opis" as="textarea" value={description}  onChange={(e)=>setDescription(e.target.value)} rows={3} />
        <br />
        <div className="button-switch-container">
          <button id="edit-rev" onClick={(e) => switchBtnHandler(e)} className="button-switch active left text-success">
            Przychód
          </button>
              
          <button id="edit-exp" onClick={(e) => switchBtnHandler(e)} className="button-switch right text-danger" >Wydatek</button>
        </div>
        <br />
        <Form.Control size="lg" type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder="kwota(zł)" />
        <br />
        <Form.Group controlId="addCategory" value={category} onChange={(e)=>setCategory(e.target.value)}>

          <Form.Control as="select" size="lg" custom>
          {categories}

          </Form.Control>
        </Form.Group>

        <Form.Control size="lg" type="date" value={date}  onChange={(e) => setDate(e.target.value)} />
        <br />

        <Button onClick={(e)=>{editHandler(e)}} className="bg-transparent border-0 float-right text-success large p-3" type="submit">
          <h2>Potwierdz</h2>
        </Button>
      </Form>
      </Modal.Body>
      </Modal.Dialog>

    </Container>
    </>
  );
};

export default History;
