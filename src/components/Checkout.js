import React, { useState, useEffect } from "react";
import { MdArrowBackIos } from "react-icons/md";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { pakingSelector } from "../reducers/parkingSlice";

const Checkout = () => {
  let { id } = useParams();
  const parkingSlot = useSelector(pakingSelector);
  var found = parkingSlot.parkingSlot.find((e) => e.id === id);
  const navigate = useNavigate();
  const [value, setValue] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  const [formData, setFormData] = useState({
    id: nanoid(),
    VehiclePlate: found.VehiclePlate,
    VehicleSize: found.VehicleSize,
    ParkingSize: found.ParkingSize,
    Date: found.Date,
    Fee: found.Fee,
  });
  const handleSubmit = () => {
    setFormData({
      VehiclePlate: "",
      VehicleSize: "",
      ParkingSize: "",
      Date: "",
      Fee: "",
    });
    navigate("/");
  };

  return (
    <div className="home-body">
      <div className="home-title">
        <div className="home-title-1">
          <p>Parking System</p>
        </div>
      </div>
      <div className="add-container_1">
        <div className="add-container">
          <div className="wide">
            <label onClick={() => navigate("/")} className="back-btn">
              <MdArrowBackIos />
              BACK TO HOME
            </label>
          </div>

          <h1>Check-out Vehicle Here</h1>
          <Clock value={value} />
          <br />
          <div className="data">
            <div className="input_1">
              <label>Vehicle Plate No. : </label>
              <label>{formData.VehiclePlate}</label>
            </div>
            <div className="input_1">
              <label>Vehicle Size : </label>
              <label>{formData.VehicleSize}</label>
            </div>
            <div className="input_1">
              <label>Vehicle Size : </label>
              <label>{formData.ParkingSize}</label>
            </div>
            <div className="input_1">
              <label>Date & Time Parked : </label>
              <label>{formData.Date}</label>
            </div>
            <div className="input_1">
              <label>Fee : </label>
              <label>{formData.Fee}</label>
            </div>
          </div>

          <div className="input_1">
            <button onClick={handleSubmit} className="btn-del mt-20px">
              Check-out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
