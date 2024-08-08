import { useState } from "react";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Accommodations from "./components/Accommodations";
import CreateBooking from "./components/CreateBooking";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div>
        <h1>Accommodation and Booking App</h1>
        <Route exact path="/accommodations" component={Accommodations} />
        <Route path="/create-booking" component={CreateBooking} />
      </div>
    </Router>
  );
}
