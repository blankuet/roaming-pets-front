import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const user = localStorage.getItem("user");
      const userInJSON = JSON.parse(user);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/booking/guest/${userInJSON._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
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
      className="flex flex-col justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/animals.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#F0F0F0",
      }}
    >
      <div className="w-full max-w-4xl p-6 bg-black bg-opacity-75 rounded-lg shadow-md text-white">
        <h1 className="text-3xl font-bold mb-4 text-center">Your Bookings</h1>
        <ul>
          {bookings.map((booking) => {
            const dateFrom = new Date(booking.dateFrom);
            const dateTo = new Date(booking.dateTo);
            const totalDays = (dateTo - dateFrom) / (1000 * 3600 * 24);

            // Check if booking.accommodation exists and has a price
            const price = booking.accommodation?.price
              ? Number(booking.accommodation.price)
              : 0;
            const totalPrice = totalDays > 0 ? price * totalDays : 0;

            return (
              <li key={booking._id} className="mb-4 p-4 bg-gray-800 rounded-lg">
                <h2 className="text-2xl font-bold mb-2">
                  <Link
                    to={`/guest/accommodation/${booking.accommodation?._id}`}
                    className="text-blue-400 hover:text-blue-800"
                  >
                    {booking.accommodation?.name || "Unknown Accommodation"}
                  </Link>
                </h2>
                <p>
                  <strong>Date From:</strong> {dateFrom.toLocaleDateString()}
                </p>
                <p>
                  <strong>Date To:</strong> {dateTo.toLocaleDateString()}
                </p>
                <p>
                  <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Bookings;
