import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AccommodationGuest = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [filteredAccommodations, setFilteredAccommodations] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    address: "",
    maxPersons: "",
    city: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const response = await fetch(
          "http://localhost:5005/api/accommodation",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        setAccommodations(data);
        setFilteredAccommodations(data); // Show all accommodations initially
      } catch (error) {
        console.error("Error fetching accommodations:", error);
      }
    };

    fetchAccommodations();
  }, []);

  // Change Filters
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Filter Accommodations
  useEffect(() => {
    const filtered = accommodations.filter((acc) => {
      return (
        (filters.name === "" ||
          acc.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (filters.maxPersons === "" ||
          acc.maxPersons >= Number(filters.maxPersons)) && // Aquí cambiamos la lógica
        (filters.city === "" ||
          acc.city.toLowerCase().includes(filters.city.toLowerCase()))
      );
    });

    setFilteredAccommodations(filtered);
  }, [filters, accommodations]);

  // Maneja el clic en una acomodación para navegar a su página de detalles
  const handleAccommodationClick = (accommodationId) => {
    navigate(`/guest/accommodation/${accommodationId}`);
  };

  return (
    <div
      className="min-h-screen bg-gray-900 p-8"
      style={{
        backgroundImage: "url('/public/animals.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#f0f0f0",
      }}
    >
      <h1 className="text-3xl font-bold text-white mb-6">
        Browse Accommodations
      </h1>

      {/* Barra de Filtrado */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg">
        <h2 className="text-xl font-bold text-white mb-4">
          Filter Accommodations
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={filters.name}
            onChange={handleFilterChange}
            className="px-4 py-2 border border-gray-600 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="number"
            name="maxPersons"
            placeholder="Max Persons & Pets"
            value={filters.maxPersons}
            onChange={handleFilterChange}
            className="px-4 py-2 border border-gray-600 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={filters.city}
            onChange={handleFilterChange}
            className="px-4 py-2 border border-gray-600 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Lista de Acomodaciones */}
      <div className="grid grid-cols-1 gap-4">
        {filteredAccommodations.map((accommodation) => (
          <div
            key={accommodation._id}
            onClick={() => handleAccommodationClick(accommodation._id)}
            className="cursor-pointer bg-gray-800 p-6 rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
          >
            <h2 className="text-2xl font-bold text-white">
              {accommodation.name}
            </h2>
            <p className="text-gray-300">Address: {accommodation.address}</p>
            <p className="text-gray-300">
              Max Persons: {accommodation.maxPersons}
            </p>
            <p className="text-gray-300">City: {accommodation.city}</p>
            <p className="text-gray-300">
              Price: ${accommodation.price} per night
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccommodationGuest;
