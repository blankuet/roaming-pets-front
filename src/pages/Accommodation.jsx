import { useState, useEffect } from "react";

export default function Accommodation() {
  const [formValues, setFormValues] = useState({
    name: "",
    address: "",
    price: "",
    maxPersons: "",
    description: "",
  });

  useEffect(() => {
    const fetchAccommodation = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/accommodation`
        );
        const data = await response.json();
        setAccommodation(data);
      } catch (error) {
        console.error("Error fetching accommodation:", error);
      }
    };
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-900"
      style={{ backgroundImage: "url('/public/animals.jpg')" }}
    >
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Create Accommodation
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-black bg-opacity-75 p-6 rounded-lg shadow-md w-full"
        >
          <h2 className="text-2xl font-bold text-center text-white mb-6">
            Create Accommodation
          </h2>

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
            Create Accommodation
          </button>
        </form>
      </div>
    </div>
  );
}
