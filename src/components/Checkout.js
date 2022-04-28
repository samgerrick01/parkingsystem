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
  console.log(found);
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

  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let hours = today.getHours() < 9 ? "0" + today.getHours() : today.getHours();
  let minutes =
    today.getMinutes() < 9 ? "0" + today.getMinutes() : today.getMinutes();
  let seconds =
    today.getSeconds() < 9 ? "0" + today.getSeconds() : today.getSeconds();
  var time = hours + ":" + minutes + ":" + seconds;
  var dateTime = date + " " + time;

  const charges =
    today.getFullYear() -
    found.Year +
    today.getMonth() +
    1 -
    found.Month +
    today.getDate() -
    found.Day;
  const charges_hours = today.getHours() - found.Hours;
  const TotalCharges = charges + charges_hours > 3 ? 3 - charges_hours : 0;
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
              <label>{formData.VehiclePlate.toUpperCase()}</label>
            </div>
            <div className="input_1">
              <label>Vehicle Size : </label>
              <label>{formData.VehicleSize}</label>
            </div>
            <div className="input_1">
              <label>Parking Size : </label>
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
            <div className="input_1">
              <label>Date & Time Now : </label>
              <label>{dateTime}</label>
            </div>
            <div className="input_1">
              <label>Additional Charges : </label>
              <label>
                {found.ParkingSize === "SMALL"
                  ? TotalCharges * 20
                  : found.ParkingSize === "MEDIUM"
                  ? TotalCharges * 60
                  : found.ParkingSize === "LARGE"
                  ? TotalCharges * 100
                  : TotalCharges}
              </label>
            </div>
            <div className="input_1">
              <label>Total Amount : </label>
              <label>{formData.Fee + charges}</label>
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
