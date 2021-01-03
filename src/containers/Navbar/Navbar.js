import React from "react";
import PropTypes from "prop-types";
import { FaBars} from "react-icons/fa";
import {Navbar} from "react-bootstrap"
import { useAppContext } from "../../context/AppContext";

function NavbarComponent() {
  const {state,setShowCat} = useAppContext();
  return (
    <Navbar className="bg-light ">
          <FaBars className="nav-toogle" onClick={()=>setShowCat(e=>!e)} />
        <Navbar.Text className="d-flex justify-content-center align-bottom w-100">
        <h2>Saldo:
          <span className={state?.saldo < 0 ? "text-danger p-1" : "text-success p-1"}>
            {state?.saldo}
          </span>
          $
        </h2>
        </Navbar.Text>
    </Navbar>
  );
}
NavbarComponent.propTypes = {
  saldo: PropTypes.number,
};

export default NavbarComponent;
