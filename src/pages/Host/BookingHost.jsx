import React, { useEffect, useState } from "react";

function BookingHost() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:5005/api/booking/host", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-4xl p-6 bg-black bg-opacity-75 rounded-lg shadow-md text-white">
        <h1 className="text-3xl font-bold mb-4 text-center">Your Bookings</h1>
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id} className="mb-4 p-4 bg-gray-800 rounded-lg">
              <h2 className="text-2xl font-bold mb-2">
                {booking.accommodation.name}
              </h2>
              <p>
                <strong>Guest Email:</strong> {booking.guestEmail}
              </p>
              <p>
                <strong>Date From:</strong>{" "}
                {new Date(booking.dateFrom).toLocaleDateString()}
              </p>
              <p>
                <strong>Date To:</strong>{" "}
                {new Date(booking.dateTo).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BookingHost;
