import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AccommodationGuest() {
  const [accommodations, setAccommodations] = useState([]);
  const [selectedAccommodation, setSelectedAccommodation] = useState("");
  const [bookingDetails, setBookingDetails] = useState({
    dateFrom: "",
    dateTo: "",
    guestEmail: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const response = await fetch("http://localhost:5005/api/accommodation");
        const data = await response.json();
        setAccommodations(data);
      } catch (error) {
        console.error("Error fetching accommodations:", error);
      }
    };

    fetchAccommodations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({
      ...bookingDetails,
      [name]: value,
    });
  };

  const handleSelectAccommodation = (accommodationId) => {
    setSelectedAccommodation(accommodationId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5005/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...bookingDetails,
          accommodationId: selectedAccommodation,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create booking");
      }
      const data = await response.json();
      console.log("Booking created:", data);
      navigate("/"); // Redirige a la página principal después de crear la reserva
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          All Accommodations
        </h1>
        <ul className="mb-8">
          {accommodations.map((accommodation) => (
            <li
              key={accommodation._id}
              className="mb-2 text-white cursor-pointer"
              onClick={() => handleSelectAccommodation(accommodation._id)}
            >
              {accommodation.name} - {accommodation.address}
            </li>
          ))}
        </ul>

        <form
          onSubmit={handleSubmit}
          className="bg-black bg-opacity-75 p-6 rounded-lg shadow-md w-full"
        >
          <h2 className="text-2xl font-bold text-center text-white mb-6">
            Create Booking
          </h2>

          <div className="mb-4">
            <label htmlFor="dateFrom" className="block text-gray-400">
              Date From:
            </label>
            <input
              type="date"
              name="dateFrom"
              value={bookingDetails.dateFrom}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-600 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="dateTo" className="block text-gray-400">
              Date To:
            </label>
            <input
              type="date"
              name="dateTo"
              value={bookingDetails.dateTo}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-600 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="guestEmail" className="block text-gray-400">
              Guest Email:
            </label>
            <input
              type="email"
              name="guestEmail"
              value={bookingDetails.guestEmail}
              onChange={handleChange}
              required
              placeholder="guest@example.com"
              className="mt-1 w-full px-4 py-2 border border-gray-600 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            Create Booking
          </button>
        </form>
      </div>
    </div>
  );
}

export default AccommodationGuest;
