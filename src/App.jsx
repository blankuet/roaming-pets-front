import React from "react";
import { Router, Routes } from "react-router-dom";
import Accommodations from "./components/Accommodations";
import CreateBooking from "./components/CreateBooking";

function App() {
  return (
    <>
      <Router>
        <h1>Accommodation and Booking</h1>
        <Routes path="/accommodations" component={Accommodations} />
        <Routes path="/create-booking" component={CreateBooking} />
      </Router>
    </>
  );
}

export default App;
