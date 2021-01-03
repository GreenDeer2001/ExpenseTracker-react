import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import EditForm from "./EditForm";
import SingleTransation from "./SingleTransation";

const History = () => {
  const { state, period, currentCategory, setShowEditForm } = useAppContext();

  const [objToEdit, setObjToEdit] = useState(null);

  const editHandler = (obj) => {
    setObjToEdit(obj);
    setShowEditForm(true);
  };

  const transationsToDisplay = state.transations.map((transation) => {
    const d = new Date(transation.date);
    if (
      d.getTime() > period &&
      (currentCategory === 0 || currentCategory === transation.category)
    ) {
      return (
        <SingleTransation
          key={transation.id}
          editHandler={editHandler}
          transation={transation}
        />
      );
    } else {
      return null;
    }
  });
  return (
    <>
      <ul className="items">{transationsToDisplay}</ul>
      <EditForm obj={objToEdit} />
    </>
  );
};

export default History;
