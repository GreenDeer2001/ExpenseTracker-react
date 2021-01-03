import React,{useState,useEffect} from "react";
import { CgAdd } from "react-icons/cg";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav"
import { useAppContext } from "../../context/AppContext";

const days7 = 604800000;
const days30 = 2592000000;
const year = 31556952000;
const sinceStart = Date.now();

const Menu = () => {
  const [periodBaner, setPeriodBaner] = useState("Select Period");
  const {state,setPeriod ,dispatch,setShowForm, period , currentCategory} = useAppContext();


    useEffect(() => {
    let rev = 0;
    let exp = 0;
    state.transations.forEach((transation) => {
      const d = new Date(transation.date);
      if (d.getTime() > period && (currentCategory === 0 || transation.category === currentCategory)) {
        if (transation.type) {
          rev += +transation.amount;
        } else {
          exp += +transation.amount;
        }
      }
    });
    if(rev !== state.revenue)
    dispatch({type:"REVENUE", revenue:rev})
    if(exp !== state.expenses)
    dispatch({type:"EXPENSES", expenses:exp})
  }, [state, period, currentCategory,dispatch]);


  const periodHandler = (time,name) => {
    const period = Date.now() - time;
    setPeriodBaner(name)
        setPeriod(period);

  };
  return (
      <Nav className="mt-1 p-3 menu">
        <Dropdown >
          <Dropdown.Toggle size="lg" className="pt-1 pb-3" id="dropdown-basic">
           {periodBaner}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => periodHandler(days7 , "Last 7 days")}>
              Last 7 days
            </Dropdown.Item>
            <Dropdown.Item onClick={() => periodHandler(days30,"Last Month")}>
              Last Month
            </Dropdown.Item>
            <Dropdown.Item onClick={() => periodHandler(year,"Last Year")}>
              Last Year
            </Dropdown.Item>
            <Dropdown.Item onClick={() => periodHandler(sinceStart,"Since Start")}>
              Since Start
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Nav.Item  className="bg-success mx-sm-3 p-2 pt-1 text-white rounded">
          <h5>
            Revenue:
            <span className="bold"> {state.revenue}</span> $
          </h5>
        </Nav.Item>
        <Nav.Item className=" p-2 pt-1 bg-danger text-white rounded">
          <h5>
            Expenses:
            <span className="bold"> {state.expenses}</span> $
          </h5>
        </Nav.Item>
        <div className="showTransationForm" onClick={()=>setShowForm(true)}>
          <CgAdd className="text-primary menu-add-icon" />
        </div>
      </Nav>
  );
};

export default Menu;
