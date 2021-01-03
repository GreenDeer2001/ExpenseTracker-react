import React from "react";
import "./App.css";
import Navbar from "./containers/Navbar/Navbar";
import Menu from "./containers/Menu/Menu";
import History from "./containers/History/History";
import Category from "./containers/Categories/Categories";
import AddTransation from "./components/addTransation/AddTransation";

function App() {
  return (
    <>
      <AddTransation />
      <Navbar />
      <Category />
      <div className="dashboard">
      <Menu />
      <History />
      </div>
    </>
  );
}

export default App;
