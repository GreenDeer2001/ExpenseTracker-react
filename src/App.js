import React from "react";
import "./App.css";
import Navbar from "./containers/Navbar/Navbar";
import reducer from "./reducer";
import Menu from "./containers/Menu/Menu";
import History from "./containers/History/History";
import Category from "./containers/Categories/Categories";
import AddTransation from "./components/addTransation/AddTransation";

const defaultValue = () => {
  const data = JSON.parse(localStorage.getItem("MONEYTRACKER"));

  if (data) {
    return data;
  } else {
    

    const defaultOpt = {
      saldo: 0,
      revenue: 0,
      expenses: 0,
      transations: [
      
      ],
      categories: [
        { text: "wszystkie", id: 0, active: true },
        { text: "wynagrodznie", id: 1, active: false },
        { text: "inwestycje", id: 2, active: false },
        { text: "dom", id: 3, active: false },
        { text: "jedzenie", id: 4, active: false },
        { text: "ubrania", id: 5, active: false },
        { text: "rachunki", id: 6, active: false },
        { text: "rozrywka", id: 7, active: false },
      ],
    };
    return defaultOpt;
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, defaultValue());
  const [period, setPeriod] = React.useState(0);
  const [curCat, setCategory] = React.useState(0);
  const [toogle, setMobileCategories] = React.useState(false);
  const [revenue, setRevenue] = React.useState(0);
  const [expenses, setExpenses] = React.useState(0);
  const [displayAddTransation, setDisplayAddTransation] = React.useState(false);

  React.useEffect(() => {
    let rev = 0;
    let exp = 0;
    state.transations.forEach((tra) => {
      const d = new Date(tra.date);
      if (d.getTime() > period && (curCat === 0 || tra.category === curCat)) {
        if (tra.type) {
          rev += +tra.amount;
        } else {
          exp += +tra.amount;
        }
      }
    });

    setRevenue(rev);
    setExpenses(exp);
  }, [state, period, curCat]);

  React.useEffect(() => {
    localStorage.setItem("MONEYTRACKER",JSON.stringify(state));

  },[state,curCat,revenue,expenses]);

  const displayAddTransationHandler = () => {
    setDisplayAddTransation(true);
  };

  const categoryHandler = (cat) => {
    setCategory(cat);
    dispatch({ type: "CATEGORY", catID: cat });
  };

  const addHandler = (obj) => {
    setDisplayAddTransation(false);
    dispatch({ type: "SALDO", amount: obj.type ? obj.amount : -(obj.amount) });
    dispatch({ type: "ADD", transation: obj });
  };

  const closeForm = () => {
    setDisplayAddTransation(false);
  };

  const removeTransation = (id) => {
    dispatch({ type: "REMOVE", ID: id });
  };

  const periodHandler = (time) => {
    setPeriod(time);
  };

  const toogleCat = () => {
    setMobileCategories((prev) => !prev);
  };

  const editHandler = (obj) => {
    dispatch({ type: "EDIT", obj: obj });
  };



  return (
    <div className="App">
      <Navbar saldo={state.saldo} toogle={toogleCat} />
      <div className="app-center">
        <div className={`category-column ${toogle && "toogle"} `}>
          <Category
            categoryHandler={categoryHandler}
            categories={state.categories}
          />
        </div>
        <div className="menu-column">
          <Menu
            expenses={expenses}
            revenue={revenue}
            displayAddTransationHandler={displayAddTransationHandler}
            periodHandler={periodHandler}
          />
          {displayAddTransation && (
            <AddTransation
              categories={state.categories}
              closeForm={closeForm}
              addHandler={addHandler}
            />
          )}
          <History
            closeForm={closeForm}
            categories={state.categories}
            editHandler={editHandler}
            curCat={curCat}
            remove={removeTransation}
            period={period}
            transations={state.transations}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
