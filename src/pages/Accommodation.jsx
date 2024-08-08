import React, { useState, useEffect } from "react";

export default function Accommodation() {
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const response = await fetch("/api/accommodations");
        const data = await response.json();
        setAccommodations(data);
      } catch (error) {
        console.error("Error fetching accommodations:", error);
      }
    };

    fetchAccommodations();
  }, []);

  return (
    <div>
      <h1>Accommodations</h1>
      <ul>
        {accommodations.map((accommodation) => (
          <li key={accommodation._id}>{accommodation.name}</li>
        ))}
      </ul>
    </div>
  );
}
