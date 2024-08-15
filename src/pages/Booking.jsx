import { useState } from "react";

export default function Booking() {
  const [booking, setBooking] = useState({
    dateFrom: "",
    dateTo: "",
    traveler: "",
    accommodationId: "",
  });

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
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        name="dateFrom"
        value={booking.dateFrom}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="dateTo"
        value={booking.dateTo}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="traveler"
        value={booking.traveler}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="accommodationId"
        value={booking.accommodationId}
        onChange={handleChange}
        required
      />
      <button type="submit">Create Booking</button>
    </form>
  );
}
