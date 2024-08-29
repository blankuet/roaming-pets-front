import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AccommodationEditHost = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    address: "",
    price: "",
    maxPersons: "",
    city: "",
    description: "",
    images: [],
  });
  const { accommodationId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccommodationDetails = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/api/accommodation/${accommodationId}`,
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
          city: data.city,
          description: data.description,
          images: data.images || [],
        });
      } catch (error) {
        console.error("Error fetching accommodation details:", error);
      }
    };

    fetchAccommodationDetails();
  }, [accommodationId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = async (event, index) => {
    const preset_name = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const cloud_name = import.meta.env.VITE_CLOUDINARY_NAME;
    const file = event.target.files[0];

    if (!file) return;

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", preset_name);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const fileData = await response.json();
      const newImages = [...formValues.images];
      newImages[index] = fileData.secure_url;

      setFormValues((prevState) => ({
        ...prevState,
        images: newImages,
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = formValues.images.filter(
      (_, imgIndex) => imgIndex !== index
    );
    setFormValues((prevState) => ({
      ...prevState,
      images: newImages,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/accommodation/${accommodationId}`,
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

      navigate(`/host/accommodation/details/${accommodationId}`);
    } catch (error) {
      console.error(error);
    }
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

          {/* Mostrar y editar imágenes */}
          <div className="mb-6">
            <h3 className="text-gray-400 mb-2">Images:</h3>
            {formValues.images.map((image, index) => (
              <div key={index} className="mb-4 flex items-center">
                <img
                  src={image}
                  alt={`Accommodation ${index + 1}`}
                  className="w-20 h-20 rounded-lg mr-4"
                />

                <input
                  type="file"
                  id="fileInput"
                  name="file"
                  onChange={(e) => handleImageChange(e, index)}
                  className="hidden"
                />
                <label
                  htmlFor="fileInput"
                  className="mb-4 bg-purple-500 hover:bg-purple-600 text-lime-200 py-2 px-4 rounded cursor-pointer flex"
                >
                  Select File
                </label>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
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
};

export default AccommodationEditHost;
