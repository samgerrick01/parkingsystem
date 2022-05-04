import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadParkings, searchParkings } from "../components/action/action";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const filter = "";
  const [value, setValue] = useState("");
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const { parkings } = useSelector((state) => ({ ...state.data }));

  const handleSearch = async (e) => {
    e.preventDefault();
    dispatch(searchParkings(value));
  };

  const handleReset = () => {
    setValue("");
    dispatch(loadParkings());
  };

  useEffect(() => {
    dispatch(loadParkings());
  }, [dispatch]);
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
        <div className="search">
          <div className="input_3">
            <label className="search-label">Search : </label>
            <input
              className="search-input uppercase"
              type="text"
              value={value}
              placeholder="Enter Plate No."
              onChange={(e) => setValue(e.target.value)}
            />
          </div>

          <div className="input_1">
            <button className="search-btn" onClick={handleSearch}>
              SEARCH
            </button>
            <button className="reset-btn" onClick={handleReset}>
              CLEAR
            </button>
          </div>
        </div>
        <h1>Parked Vehicles</h1>
        <ul className="ul-list">
          {parkings
            .filter(
              (park) =>
                !filter ||
                park.VehiclePlate?.toLowerCase()?.indexOf(
                  filter?.toLowerCase()
                ) >= 0
            )
            .map((park) => {
              return (
                <li
                  key={park.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/checkout/${park.id}`);
                  }}
                >
                  Plate No. : {park.VehiclePlate}
                  <br />
                  Vehicle Size : {park.VehicleSize}
                  <br />
                  Parking Size : {park.ParkingSize}
                  <br />
                  Date : {park.Date}
                  <br />
                  Initial Fee : {park.Fee}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
