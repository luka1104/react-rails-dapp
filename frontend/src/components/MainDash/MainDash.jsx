import React, { useEffect, useContext } from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import CustomerReview from "../CustomerReview/CustomerReview";
import Updates from "../Updates/Updates";
import "./MainDash.css";

const MainDash = () => {
  return (
    <div className="MainDash">
      <div className="CardTables">
        <h1>Dashboard</h1>
        <Cards />
        <Table />
      </div>
      <div className="RightSide">
        <div>
          <h3>Updates</h3>
          <Updates />
        </div>
        <div>
          <h3>Customer Review</h3>
          <CustomerReview />
        </div>
      </div>
    </div>
  );
};

export default MainDash;
