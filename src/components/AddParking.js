import React, { useState, useEffect } from "react";
import { MdArrowBackIos } from "react-icons/md";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addParking } from "../reducers/parkingSlice";
import { nanoid } from "@reduxjs/toolkit";
import { static_variables } from "../environment";

const AddParking = () => {
  const { SMALL, MEDIUM, LARGE } = static_variables.COST;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;

  const [formData, setFormData] = useState({
    id: nanoid(),
    VehiclePlate: "",
    VehicleSize: "",
    ParkingSize: "",
    Date: dateTime,
    Fee: "",
  });
  console.log(formData.Fee);
  const clear = () => {
    setFormData({
      VehiclePlate: "",
      VehicleSize: "",
      ParkingSize: "",
      Date: dateTime,
    });
  };
  const [err, setErr] = useState("");
  const handleSubmit = () => {
    if (
      !formData.VehiclePlate ||
      !formData.ParkingSize ||
      !formData.VehicleSize
    ) {
      setErr("Please Input a Vehicle Plate No.");
    } else {
      dispatch(addParking(formData));
      navigate("/");
      clear();
      setErr("");
    }
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

          <h1>Add Vehicle Here</h1>
          <Clock value={value} />
          <br />
          {err && (
            <span
              className="mb-20px"
              style={{ color: "red", fontSize: "14px" }}
            >
              {err}
            </span>
          )}
          <div className="input_1">
            <label>Vehicle Plate No. : </label>
            <input
              autoComplete="off"
              value={formData.VehiclePlate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  VehiclePlate: e.target.value.trimStart(),
                })
              }
              type="text"
              name="lname"
              placeholder=""
              required
            />
            <div className="input_2">
              <select
                className="select mt-20px"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    VehicleSize: e.target.value,
                    ParkingSize: "",
                  });
                }}
                value={formData.VehicleSize}
              >
                <option hidden value="">
                  Vehicle Size
                </option>
                <option value="SMALL">SMALL</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="LARGE">LARGE</option>
              </select>
            </div>
            <div className="input_3">
              <select
                className="select mt-20px"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    ParkingSize: e.target.value,
                  });
                }}
                onBlur={() => {
                  setFormData({
                    ...formData,
                    Fee:
                      formData.ParkingSize === "SMALL"
                        ? SMALL
                        : formData.ParkingSize === "MEDIUM"
                        ? MEDIUM
                        : formData.ParkingSize === "LARGE"
                        ? LARGE
                        : null,
                  });
                }}
                value={formData.ParkingSize}
              >
                <option hidden value="">
                  Parking Size
                </option>
                <option
                  hidden={
                    formData.VehicleSize === "Medium" ||
                    formData.VehicleSize === "Large"
                      ? true
                      : false
                  }
                  value="SMALL"
                >
                  SMALL
                </option>
                <option
                  hidden={formData.VehicleSize === "Large" ? true : false}
                  value="MEDIUM"
                >
                  MEDIUM
                </option>
                <option value="LARGE">LARGE</option>
              </select>
            </div>
          </div>
          <div className="input_2">
            <button onClick={handleSubmit} className="btn-add mt-20px">
              Park
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddParking;
