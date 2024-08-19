import React, { useEffect, useState } from "react";

export default function ListAccommodation() {
  const [accommodations, setAccommodation] = useState([]);

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
    <div
      className="min-h-screen flex items-center justify-center bg-gray-900"
      style={{ backgroundImage: "url('/public/animals.jpg')" }}
    >
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Accommodation List
        </h1>
        <ul className="mb-8">
          {accommodations.map((accommodation) => (
            <li key={accommodation._id} className="mb-2 text-white">
              {accommodation.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
