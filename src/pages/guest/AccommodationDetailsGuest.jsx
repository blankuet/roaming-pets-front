import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AccommodationDetailsGuest() {
  const { accommodationId } = useParams();
  const [accommodation, setAccommodation] = useState(null);

  useEffect(() => {
    const fetchAccommodationDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5005/api/accommodation/${accommodationId}`
        );
        const data = await response.json();
        setAccommodation(data);
      } catch (error) {
        console.error("Error fetching accommodation details:", error);
      }
    };

    fetchAccommodationDetails();
  }, [accommodationId]);

  if (!accommodation) {
    return <div className="text-white text-center">Loading...</div>;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-900"
      style={{ backgroundImage: "url('/public/animals.jpg')" }}
    >
      <div className="w-full max-w-2xl p-6 bg-black bg-opacity-75 rounded-lg shadow-md text-white">
        <h1 className="text-3xl font-bold mb-4">{accommodation.name}</h1>
        <p className="mb-2">
          <strong>Address:</strong> {accommodation.address}
        </p>
        <p className="mb-2">
          <strong>Price per Night:</strong> ${accommodation.price}
        </p>
        <p className="mb-2">
          <strong>Max Persons:</strong> {accommodation.maxPersons}
        </p>
        <p className="mb-4">
          <strong>Description:</strong> {accommodation.description}
        </p>

        <div className="grid grid-cols-2 gap-4">
          {accommodation.images?.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              className="rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AccommodationDetailsGuest;
