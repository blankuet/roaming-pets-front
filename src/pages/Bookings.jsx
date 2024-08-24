import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Bookings() {
  const [bookingDetails, setBookingDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const booking = JSON.parse(localStorage.getItem("bookingDetails"));
    if (booking && booking.accommodation) {
      setBookingDetails(booking);
    } else {
      navigate("/guest/accommodations"); // Redirect if no booking found
    }
  }, [navigate]);

  if (!bookingDetails) {
    return <div className="text-white text-center">Loading...</div>;
  }

  // Ensure dateFrom and dateTo are valid dates
  const dateFrom = new Date(bookingDetails.dateFrom);
  const dateTo = new Date(bookingDetails.dateTo);
  
  const totalDays = (dateTo - dateFrom) / (1000 * 3600 * 24);
  
  // Ensure price is a number and totalDays is positive
  const price = Number(bookingDetails.accommodation.price) || 0;
  const totalPrice = totalDays > 0 ? price * totalDays : 0;

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-900"
      style={{ backgroundImage: "url('/public/animals.jpg')" }}
    >
      <div className="w-full max-w-4xl p-6 bg-black bg-opacity-75 rounded-lg shadow-md text-white">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Booking Details
        </h1>
        <div className="mb-4 p-4 bg-gray-800 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">
            {bookingDetails.accommodation.name}
          </h2>
          <p>
            <strong>Host Email:</strong> {bookingDetails.accommodation.hostEmail || 'Not Available'}
          </p>
          <p>
            <strong>Address:</strong> {bookingDetails.accommodation.address || 'Not Available'}
          </p>
          <p>
            <strong>Date From:</strong>{" "}
            {dateFrom.toLocaleDateString()}
          </p>
          <p>
            <strong>Date To:</strong>{" "}
            {dateTo.toLocaleDateString()}
          </p>
          <p>
            <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Bookings;
