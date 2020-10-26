import React from "react";
import "./Menu.css";
import { CgAdd } from "react-icons/cg";
import Dropdown from "react-bootstrap/Dropdown";

const days7 = 604800000;
const days30 = 2592000000;
const year = 31556952000;
const sinceStart = Date.now();

const Menu = (props) => {
  const [periodBaner, setPeriodBaner] = React.useState("Wybierz Okres");

 

  const periodHandler = (time , name) => {
    const period = Date.now() - time;
    setPeriodBaner(name)
    props.periodHandler(period);
  };
  return (
    <div className="menu">
      <div className="menu-container ">
        <Dropdown>
          <Dropdown.Toggle size="lg sm" id="dropdown-basic">
           {periodBaner}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => periodHandler(days7 , "Ostatnie 7 dni")}>
              Ostatnie 7 dni
            </Dropdown.Item>
            <Dropdown.Item onClick={() => periodHandler(days30,"Ostatni miesiąc")}>
              Ostatni miesiąc
            </Dropdown.Item>
            <Dropdown.Item onClick={() => periodHandler(year,"Ostatni rok")}>
              Ostatni rok
            </Dropdown.Item>
            <Dropdown.Item onClick={() => periodHandler(sinceStart,"Od początku")}>
              Od początku
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <div className="info-container bg-success text-white rounded">
          <h5>
            {" "}
            Dochód:
            <span className="bold"> {props.revenue}</span> zł{" "}
          </h5>
        </div>
        <div className="info-container bg-danger text-white rounded">
          <h5>
            {" "}
            Wydatki:
            <span className="bold"> {props.expenses}</span> zł{" "}
          </h5>
        </div>
        {/* <div
          className={`info-container text-white rounded ${
            bilans >= 0 ? "bg-success" : "bg-danger"
          } `}
        >
          <h5>
            {" "}
            Różnica:
            <span className="bold"> 30</span> zł{" "}
          </h5>
        </div> */}

        <div className="showTransationForm" onClick={props.displayAddTransationHandler}>
          <CgAdd className="text-primary menu-add-icon" />
        </div>
      </div>
    </div>
  );
};

export default Menu;
