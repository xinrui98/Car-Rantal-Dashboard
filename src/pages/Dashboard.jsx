import "../styles/dashboard.css";
import SingleCard from "../components/reuseable/SingleCard";

import MileChart from "../charts/MileChart";
import CarStatsChart from "../charts/CarStatsChart";
import RecommendCarCard from "../components/UI/RecommendCarCard";

import recommendCarsData from "../assets/dummy-data/recommendCars";
import React, { useState, useEffect } from "react";

import { API } from "aws-amplify";
import { listTodos } from "../graphql/queries";
import { createTodo, deleteTodo } from "../graphql/mutations";

const Dashboard = () => {
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

  const [notes, setNotes] = useState([]);
  const [climbs, setClimbs] = useState({});
  const [minutes, setMinutes] = useState({});
  const [calories, setCalories] = useState({});
  const [heartRate, setHeartRate] = useState({});

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    fetchClimbs();
  }, {});

  useEffect(() => {
    fetchMinutes();
  }, {});

  useEffect(() => {
    fetchCalories();
  }, {});

  useEffect(() => {
    fetchHeartRate();
  }, {});

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listTodos });
    const notesFromAPI = apiData.data.listTodos.items;
    setNotes(notesFromAPI);
    console.log(notesFromAPI);
  }

  async function fetchClimbs() {
    const apiData = await API.graphql({ query: listTodos });
    const notesFromAPI = apiData.data.listTodos.items;
    const numClimbs = notesFromAPI.length;

    const climbObject = {
      title: "Total Climbs",
      totalNumber: numClimbs.toString(),
      icon: "ri-numbers-line",
    };
    setClimbs(climbObject);
  }

  async function fetchMinutes() {
    const apiData = await API.graphql({ query: listTodos });
    const notesFromAPI = apiData.data.listTodos.items;
    const numSeconds = notesFromAPI.reduce((acc, curr) => {
      return acc + parseInt(curr["timeInSeconds"]);
    }, 0);

    const minutesObject = {
      title: "Total Hours Spent",
      totalNumber: Math.floor(numSeconds / 60).toString(),
      icon: "ri-time-line",
    };
    setMinutes(minutesObject);
  }

  async function fetchCalories() {
    const apiData = await API.graphql({ query: listTodos });
    const notesFromAPI = apiData.data.listTodos.items;
    const numCalories = notesFromAPI.reduce((acc, curr) => {
      return acc + parseInt(curr["calories"]);
    }, 0);

    const caloriesObject = {
      title: "Total KCalories Burnt",
      totalNumber: numCalories.toString(),
      icon: "ri-timer-flash-line",
    };
    setCalories(caloriesObject);
  }

  async function fetchHeartRate() {
    const apiData = await API.graphql({ query: listTodos });
    const notesFromAPI = apiData.data.listTodos.items;
    const length = notesFromAPI.length;
    const totalHeartRate = notesFromAPI.reduce((acc, curr) => {
      return acc + parseInt(curr["heartRate"]);
    }, 0);

    const heartRateObject = {
      title: "AVG. Heart Rate",
      totalNumber: Math.floor(totalHeartRate / length).toString(),
      icon: "ri-heart-pulse-fill",
    };
    setHeartRate(heartRateObject);
  }

  async function createNote(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      name: form.get("name"),
      description: form.get("description"),
    };
    await API.graphql({
      query: createTodo,
      variables: { input: data },
    });
    fetchNotes();
    event.target.reset();
  }

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
          <SingleCard item={climbs} />
          <SingleCard item={minutes} />
          <SingleCard item={calories} />
          <SingleCard item={heartRate} />
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
