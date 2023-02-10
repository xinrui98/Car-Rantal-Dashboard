import React from "react";
import "../styles/dashboard.css";
import SingleCard from "../components/reuseable/SingleCard";

import MileChart from "../charts/MileChart";
import CarStatsChart from "../charts/CarStatsChart";
import RecommendCarCard from "../components/UI/RecommendCarCard";

import recommendCarsData from "../assets/dummy-data/recommendCars";

const carObj = {
  title: "Total Climbs",
  totalNumber: 750,
  icon: "ri-numbers-line",
};

const tripObj = {
  title: "Total Hours Spent",
  totalNumber: 1697,
  icon: "ri-time-line",
};

const clientObj = {
  title: "Total KCalories Burnt",
  totalNumber: "85k",
  icon: "ri-timer-flash-line",
};

const distanceObj = {
  title: "AVG. Heart Rate",
  totalNumber: 180,
  icon: "ri-heart-pulse-fill",
};

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard__wrapper">
        <div className="filter__widget-wrapper">
          <div className="filter__widget-01">
            <select>
              <option value="Week">Week</option>
              <option value="Month">Month</option>
              <option value="Year">Year</option>
            </select>
          </div>

          <div className="filter__widget-01">
            <select>
              <option value="Blue">Blue</option>
              <option value="Green">Green</option>
              <option value="Red">Red</option>
            </select>
          </div>
        </div>
        <div className="dashboard__cards">
          <SingleCard item={carObj} />
          <SingleCard item={tripObj} />
          <SingleCard item={clientObj} />
          <SingleCard item={distanceObj} />
        </div>

        <div className="statics">
          <div className="stats">
            <h3 className="stats__title">AVG. Time Taken</h3>
            <MileChart />
          </div>

          <div className="stats">
            <h3 className="stats__title">AVG. Calories Burnt</h3>
            <CarStatsChart />
          </div>
        </div>

        <div className="recommend__cars-wrapper">
          {recommendCarsData.map((item) => (
            <RecommendCarCard item={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
