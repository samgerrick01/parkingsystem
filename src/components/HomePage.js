import React from "react";
import { useSelector } from "react-redux";
import { pakingSelector } from "../reducers/parkingSlice";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const { parkingSlot } = useSelector(pakingSelector);
  console.log(parkingSlot);
  return (
    <div className="home-body">
      <div className="home-title">
        <div className="home-title-1">
          <p>Parking System</p>
        </div>
      </div>
      <div className="home-content">
        <button onClick={() => navigate("/add")} className="btn-add">
          Check-in Vehicle
        </button>
        {/* <button onClick={() => navigate("/checkout")} className="btn-del">
          Check-out Vehicle
        </button> */}
      </div>

      <div className="show-parking-slot">
        <h1>Parked Vehicles</h1>
        <ul className="ul-list">
          {parkingSlot.map((parking) => {
            return (
              <li key={parking.id}>
                {parking.VehiclePlate}
                <br />
                {parking.Date}
                <br />
                {parking.VehicleSize}
                <br />
                {parking.ParkingSize}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
