import React from "react";
import PropTypes from "prop-types";
import "./Navbar.css";
import { AiFillSetting, AiOutlineBars } from "react-icons/ai";

function Navbar(props) {
  const { saldo } = props;
  return (
    <div>
      <div className="navbar">
        <div className="mobile-screen-left">
          <AiOutlineBars className="nav-toogle" onClick={()=>props.toogle()} />
          <h2>EXPER</h2>
        </div>
        <h2 className="saldo">
          {" "}
          Saldo:
          <span className={saldo < 0 ? "negative" : "positive"}>
            {" "}
            {saldo}
          </span>{" "}
          zł{" "}
        </h2>
        <button className="nav-settings">
          <AiFillSetting className="nav-icon"  />
        </button>
      </div>
    </div>
  );
}

Navbar.propTypes = {
  saldo: PropTypes.number,
};

export default Navbar;
