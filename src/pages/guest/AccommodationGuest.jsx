import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AccommodationGuest() {
  const [accommodations, setAccommodations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const response = await fetch("http://localhost:5005/api/accommodation");
        const data = await response.json();
        setAccommodations(data);
      } catch (error) {
        console.error("Error fetching accommodations:", error);
      }
    };

    fetchAccommodations();
  }, []);

  const handleSelectAccommodation = (accommodationId) => {
    navigate(`/guest/accommodation/${accommodationId}`);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-900"
      style={{ backgroundImage: "url('/public/animals.jpg')" }}
    >
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          All Accommodations
        </h1>
        <ul className="mb-8">
          {accommodations.map((accommodation) => (
            <li
              key={accommodation._id}
              className="mb-2 text-white cursor-pointer"
              onClick={() => handleSelectAccommodation(accommodation._id)}
            >
              {accommodation.name} - {accommodation.address}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AccommodationGuest;
