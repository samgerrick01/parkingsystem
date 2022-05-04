import React, { useState, useEffect } from "react";
import { MdArrowBackIos } from "react-icons/md";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { deleteParking, getSingleParking } from "../components/action/action";
import moment from "moment";

const Checkout = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const { parking } = useSelector((state) => state.data);
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
    VehiclePlate: "",
    VehicleSize: "",
    ParkingSize: "",
    Date: "",
    Fee: "",
    Year: "",
    Month: "",
    Day: "",
    Hours: "",
    Minutes: "",
    Seconds: "",
  });
  const handleSubmit = () => {
    if (window.confirm("Are you sure you want to Cheeck-out?")) {
      dispatch(deleteParking(id));
      setFormData({
        VehiclePlate: "",
        VehicleSize: "",
        ParkingSize: "",
        Date: "",
        Fee: "",
        Year: "",
        Month: "",
        Day: "",
        Hours: "",
        Minutes: "",
        Seconds: "",
      });
      navigate("/");
    }
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

  //USE EFFECT
  useEffect(() => {
    dispatch(getSingleParking(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (parking) {
      setFormData({ ...parking });
    }
  }, [parking]);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const hour = moment(formData.Date).fromNow();
    switch (hour) {
      case "1 hours ago":
        setVal(1);
        break;
      case "2 hours ago":
        setVal(2);
        break;
      case "3 hours ago":
        setVal(3);
        break;
      case "4 hours ago":
        setVal(4);
        break;
      case "5 hours ago":
        setVal(5);
        break;
      case "6 hours ago":
        setVal(6);
        break;
      case "7 hours ago":
        setVal(7);
        break;
      case "8 hours ago":
        setVal(8);
        break;
      case "9 hours ago":
        setVal(9);
        break;
      case "10 hours ago":
        setVal(10);
        break;
      case "11 hours ago":
        setVal(11);
        break;
      case "12 hours ago":
        setVal(12);
        break;
      case "13 hours ago":
        setVal(13);
        break;
      case "14 hours ago":
        setVal(14);
        break;
      case "15 hours ago":
        setVal(15);
        break;
      case "16 hours ago":
        setVal(16);
        break;
      case "17 hours ago":
        setVal(17);
        break;
      case "18 hours ago":
        setVal(18);
        break;
      case "19 hours ago":
        setVal(19);
        break;
      case "20 hours ago":
        setVal(20);
        break;
      case "21 hours ago":
        setVal(21);
        break;
      case "22 hours ago":
        setVal(22);
        break;
      case "23 hours ago":
        setVal(23);
        break;
      case "24 hours ago":
        setVal(24);
        break;
      case "in a day":
        setVal(25);
        break;
      default:
    }
  }, [dateTime]);

  const TotalCharges = val <= 3 ? 0 : val - 3;
  const AdditionalCharges =
    formData.ParkingSize === "SMALL"
      ? val > 23
        ? 5000
        : TotalCharges * 20
      : formData.ParkingSize === "MEDIUM"
      ? val > 23
        ? 5000
        : TotalCharges * 60
      : formData.ParkingSize === "LARGE"
      ? val > 23
        ? 5000
        : TotalCharges * 100
      : TotalCharges;
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
              <label className="uppercase">{formData.VehiclePlate}</label>
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
              <label>{AdditionalCharges}</label>
            </div>
            <div className="input_1">
              <label>Total Amount : </label>
              <label>{formData.Fee + AdditionalCharges}</label>
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
