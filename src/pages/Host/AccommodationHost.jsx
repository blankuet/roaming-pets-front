import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AccommodationHost() {
  const [accommodations, setAccommodations] = useState([]);
  const [formValues, setFormValues] = useState({
    name: "",
    address: "",
    price: "",
    maxPersons: "",
    city: "",
    description: "",
  });
  const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de confirmación
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHostAccommodations = async () => {
      const user = localStorage.getItem("user");
      const goodUser = JSON.parse(user);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/accommodation/host/` +
            goodUser._id,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        setAccommodations(data);
      } catch (error) {
        console.error("Error fetching host accommodations:", error);
      }
    };

    fetchHostAccommodations();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = localStorage.getItem("user");
    const goodUser = JSON.parse(user);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/accommodation/host/${
          goodUser._id
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formValues),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create accommodation");
      }

      const data = await response.json();
      console.log("Accommodation created:", data);

      // Añadir la nueva acomodación a la lista
      setAccommodations([...accommodations, data.accommodation]);

      // Mostrar mensaje de éxito
      setSuccessMessage("You created an accommodation successfully!");

      // Limpiar el formulario
      setFormValues({
        name: "",
        address: "",
        price: "",
        maxPersons: "",
        city: "",
        description: "",
      });

      // Ocultar el mensaje después de 3 segundos
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAccommodationClick = (accommodationId) => {
    navigate(`/host/accommodation/details/${accommodationId}`);
  };

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
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Your Accommodations
        </h1>
        <ul className="mb-8">
          {accommodations.map((accommodation) => (
            <li
              key={accommodation._id}
              className="mb-2 text-white cursor-pointer"
              onClick={() => handleAccommodationClick(accommodation._id)}
            >
              {accommodation.name} - {accommodation.address}
            </li>
          ))}
        </ul>

        {/* Mostrar mensaje de éxito */}
        {successMessage && (
          <div className="mb-6 p-4 text-center text-white bg-green-600 rounded-lg">
            {successMessage}
          </div>
        )}

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
          <div className="mb-4">
            <label htmlFor="city" className="block text-gray-400">
              City:
            </label>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formValues.city}
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

export default AccommodationHost;
