import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BookingHost() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const user = localStorage.getItem("user");
      const userInJSON = JSON.parse(user);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/booking/host/${userInJSON._id}`, {
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
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/public/animals.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#f0f0f0",
      }}
    >
      <div className="w-full max-w-4xl p-6 bg-black bg-opacity-75 rounded-lg shadow-md text-white">
        <h1 className="text-3xl font-bold mb-4 text-center">Your Bookings</h1>
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id} className="mb-4 p-4 bg-gray-800 rounded-lg">
              <h2 className="text-2xl font-bold mb-2">
                {booking.accommodation.name}
              </h2>
              <p>
                <strong>Guest Name:</strong>{" "}
                <Link
                  to={`/guest/${booking.guestId._id}`}
                  className="text-blue-400 hover:underline"
                >
                  {booking.guestId.name}
                </Link>
              </p>
              <p>
                <strong>Guest Email:</strong> {booking.guestId.email}
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
