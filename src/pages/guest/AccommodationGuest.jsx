import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AccommodationGuest() {
  const [accommodations, setAccommodations] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/accommodation`);
        const data = await response.json();
        setAccommodations(data);
      } catch (error) {
        console.error("Error fetching accommodations:", error);
      }
    };

    fetchAccommodations();
  }, []);

  const filteredAccommodations = accommodations.filter((accommodation) => {
    return accommodation.name.toLowerCase().includes(filter.toLowerCase());
  });
  

  const handleSelectAccommodation = (accommodationId) => {
    navigate(`/guest/accommodation/${accommodationId}`);
  };

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
    <label htmlFor="filter" className="mb-2 text-white">Search by name: 
    <input
      type="text"
      id="filter"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="mb-2 text-black"
    />
    </label>
    <label htmlFor="filter" className="mb-2 text-white">Search by city: 
    <input
      type="text"
      id="filter"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="mb-2 text-black"
    />
    </label>
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          All Accommodations
        </h1>
        <ul className="mb-8">
          {filteredAccommodations.map((accommodation) => (
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
