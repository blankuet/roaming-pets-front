import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AccommodationEditHost() {
  const [formValues, setFormValues] = useState({
    name: "",
    address: "",
    price: "",
    maxPersons: "",
    description: "",
  });
  const { accommodationId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccommodationDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5005/api/accommodation/${accommodationId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        setFormValues({
          name: data.name,
          address: data.address,
          price: data.price,
          maxPersons: data.maxPersons,
          description: data.description,
        });
      } catch (error) {
        console.error("Error fetching accommodation details:", error);
      }
    };

    fetchAccommodationDetails();
  }, [accommodationId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5005/api/accommodation/${accommodationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formValues),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update accommodation");
      }

      console.log("Accommodation updated successfully");

      navigate("/host/accommodation");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Edit Accommodation
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-black bg-opacity-75 p-6 rounded-lg shadow-md w-full"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-400">
              Accommodation Name:
            </label>
            <input
              type="text"
              name="name"
              placeholder="Accommodation Name"
              value={formValues.name}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-600 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-400">
              Address:
            </label>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formValues.address}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-600 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-400">
              Price per Night:
            </label>
            <input
              type="number"
              name="price"
              placeholder="Price per Night"
              value={formValues.price}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-600 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="maxPersons" className="block text-gray-400">
              Max Persons:
            </label>
            <input
              type="number"
              name="maxPersons"
              placeholder="Max Persons"
              value={formValues.maxPersons}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-600 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-400">
              Description:
            </label>
            <textarea
              name="description"
              placeholder="Description"
              value={formValues.description}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-600 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default AccommodationEditHost;
