import { useEffect, useState } from "react";

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const user = localStorage.getItem("user");
      const userInJSON = JSON.parse(user);

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/booking/guest/${userInJSON._id}`, {
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

  if (bookings.length === 0) {
    return <div className="text-white text-center">You have no bookings.</div>;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-900"
      style={{ backgroundImage: "url('/public/animals.jpg')" }}
    >
      <div className="w-full max-w-4xl p-6 bg-black bg-opacity-75 rounded-lg shadow-md text-white">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Your Bookings
        </h1>
        <ul>
          {bookings.map((booking) => {
            const dateFrom = new Date(booking.dateFrom);
            const dateTo = new Date(booking.dateTo);
            const totalDays = (dateTo - dateFrom) / (1000 * 3600 * 24);
            const price = Number(booking.accommodation.price) || 0;
            const totalPrice = totalDays > 0 ? price * totalDays : 0;

            return (
              <li key={booking._id} className="mb-4 p-4 bg-gray-800 rounded-lg">
                <h2 className="text-2xl font-bold mb-2">
                  {booking.accommodation.name}
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

