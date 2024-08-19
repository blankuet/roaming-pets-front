import { useState, useEffect } from "react";

export default function Booking() {
  const [booking, setBooking] = useState({
    dateFrom: "",
    dateTo: "",
    guestEmail: "",
    accommodationName: "",
  });

  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const response = await fetch("/accommodation");
        const data = await response.json();
        setAccommodations(data);
      } catch (error) {
        console.error("Error fetching accommodation:", error);
      }
    };

    fetchAccommodations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      });
      const data = await response.json();
      console.log("Booking created:", data);
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-900"
      style={{ backgroundImage: "url('/public/animals.jpg')" }}
    >
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Create Booking
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-black bg-opacity-75 p-6 rounded-lg shadow-md w-full"
        >
          <div className="mb-4">
            <label htmlFor="dateFrom" className="block text-gray-400">
              Date From:
            </label>
            <input
              type="date"
              name="dateFrom"
              value={booking.dateFrom}
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
              value={booking.dateTo}
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
              value={booking.guestEmail}
              onChange={handleChange}
              required
              placeholder="guest@example.com"
              className="mt-1 w-full px-4 py-2 border border-gray-600 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="accommodationName" className="block text-gray-400">
              Accommodation Name:
            </label>
            <select
              name="accommodationName"
              value={booking.accommodationName}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-600 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Accommodation</option>
              {accommodations.map((accommodation) => (
                <option key={accommodation._id} value={accommodation.name}>
                  {accommodation.name}
                </option>
              ))}
            </select>
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
