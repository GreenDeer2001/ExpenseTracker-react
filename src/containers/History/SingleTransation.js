import React from "react";
import { AiFillSetting } from "react-icons/ai";
import Button from "react-bootstrap/Button";

const SingleTransation = ({ transation,editHandler }) => {


  const renderTransation = transation.type ? (
    <h3 className="text-success">(+){transation.amount}</h3>
  ) : (
    <h3 className="text-danger">(-){transation.amount}</h3>
  );

  return (
    <div className="item pl-3">
      <h3>{transation.title}</h3>

      <div className=" d-flex mr-2 justify-content-center">
        {renderTransation}
      </div>

      <div className="d-flex">
        <p className="lead mb-0 pt-1 mr-2 align-text-bottom">
          {transation.date}
        </p>
        <Button variant="dark" size="sm" onClick={()=>editHandler(transation)}>
          <AiFillSetting className="item-icon"  />
        </Button>
      </div>
    </div>
  );
};

export default SingleTransation;
