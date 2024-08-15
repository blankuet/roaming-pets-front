import { useState, useEffect } from "react";

export default function Accommodation() {
  const [accommodation, setAccommodation] = useState([]);

  useEffect(() => {
    const fetchAccommodation = async () => {
      try {
        const response = await fetch("http://localhost:5005/api/accommodation");
        const data = await response.json();
        setAccommodation(data);
      } catch (error) {
        console.error("Error fetching accommodation:", error);
      }
    };

    fetchAccommodation();
  }, []);

  return (
    <div>
      <h1>Accommodation</h1>
      <ul>
        {accommodation.map((accommodation) => (
          <li key={accommodation._id}>{accommodation.name}</li>
        ))}
      </ul>
    </div>
  );
}
