import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageFormAccommodation from "../../components/ImageFormAccommodation";

function AccommodationDetailsHost() {
  const [accommodation, setAccommodation] = useState(null);
  const [showImageForm, setShowImageForm] = useState(false);
  const { accommodationId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccommodationDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/accommodation/${accommodationId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setAccommodation(data);
      } catch (error) {
        console.error("Error fetching accommodation details:", error);
      }
    };

    fetchAccommodationDetails();
  }, [accommodationId]);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/accommodation/${accommodationId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete accommodation");
      }

      console.log("Accommodation deleted successfully");
      navigate("/host/accommodation");
    } catch (error) {
      console.error("Error deleting accommodation:", error);
    }
  };

  const handleEdit = () => {
    navigate(`/host/accommodation/edit/${accommodationId}`);
  };

  const handleSaveImages = (newImages) => {
    setAccommodation((prev) => ({
      ...prev,
      images: newImages,
    }));
    setShowImageForm(false);
    location.reload()
  };

  if (!accommodation) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/public/animals.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#f0f0f0",
      }}
    >
      <div className="w-full max-w-md bg-black bg-opacity-75 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          {accommodation.name}
        </h1>
        <p className="text-gray-300 mb-2">
          <strong>Address:</strong> {accommodation.address}
        </p>
        <p className="text-gray-300 mb-2">
          <strong>Price per Night:</strong> ${accommodation.price}
        </p>
        <p className="text-gray-300 mb-2">
          <strong>Max Persons:</strong> {accommodation.maxPersons}
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Description:</strong> {accommodation.description}
        </p>

        <button
          onClick={handleEdit}
          className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300 mb-4"
        >
          Edit Accommodation
        </button>
        <button
          onClick={handleDelete}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Delete Accommodation
        </button>

        <button
          onClick={() => setShowImageForm(!showImageForm)}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300 mt-4"
        >
          {showImageForm ? "Hide Image Form" : "Add Images"}
        </button>

        {showImageForm && (
          <div className="mt-4">
            <ImageFormAccommodation
              accommodationId={accommodationId}
              onSave={handleSaveImages}
            />
          </div>
        )}

        <div className="mt-6">
          <h2 className="text-2xl text-white mb-4">Images:</h2>
          <div className="grid grid-cols-2 gap-4">
            {accommodation.images &&
              accommodation.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Accommodation ${index + 1}`}
                  className="w-full h-auto rounded-lg"
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccommodationDetailsHost;
