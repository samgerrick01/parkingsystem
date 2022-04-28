import React from "react";
import "./styles/parking.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import AddParking from "./components/AddParking";
import Checkout from "./components/Checkout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/add" element={<AddParking />} />
        <Route path="/checkout/:id" element={<Checkout />} />
      </Routes>
    </Router>
  );
};

export default App;
