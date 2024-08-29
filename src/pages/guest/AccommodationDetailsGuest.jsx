import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import RatingWithReview from "../../components/RatingWithReview";
import Rating from "../../components/Rating";

function AccommodationDetailsGuest() {
  const { accommodationId } = useParams();
  const [accommodation, setAccommodation] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [bookingDetails, setBookingDetails] = useState({
    dateFrom: "",
    dateTo: "",
    guestEmail: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccommodationDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/accommodation/${accommodationId}`
        );
        const data = await response.json();
        setAccommodation(data);
        setReviews(data.reviews || []);
      } catch (error) {
        console.error("Error fetching accommodation details:", error);
      }
    };

    fetchAccommodationDetails();
  }, [accommodationId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({
      ...bookingDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      console.error("User not found in localStorage");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/booking`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...bookingDetails,
            accommodationId,
            guestId: user._id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create booking");
      }

      const data = await response.json();
      console.log("Booking created:", data);

      // Almacenar los detalles de la reserva en localStorage
      localStorage.setItem(
        "bookingDetails",
        JSON.stringify({
          ...bookingDetails,
          accommodation: { _id: accommodationId, ...accommodation },
        })
      );

      navigate("/guest/bookings");
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  const handleReviewSubmit = async (newReview) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/accommodation/${accommodationId}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newReview),
        }
      );
      const savedReview = await response.json();
      setReviews([...reviews, savedReview]);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? reviews.reduce((sum, review) => sum + (review.rating || 0), 0) /
        totalReviews
      : 0;

  if (!accommodation) {
    return <div className="text-white text-center">Loading...</div>;
  }

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
      <div className="w-full max-w-2xl p-6 bg-black bg-opacity-75 rounded-lg shadow-md text-white">
        <h1 className="text-3xl font-bold mb-4">{accommodation.name}</h1>
        <p className="mb-2">
          <strong>Address:</strong> {accommodation.address}
        </p>
        <p className="mb-2">
          <strong>Price per Night:</strong> ${accommodation.price}
        </p>
        <p className="mb-2">
          <strong>Max Persons:</strong> {accommodation.maxPersons}
        </p>
        <p className="mb-4">
          <strong>Description:</strong> {accommodation.description}
        </p>

        <div className="grid grid-cols-2 gap-4">
          {accommodation.images?.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              className="rounded-lg"
            />
          ))}
        </div>

        {/* Enlace al perfil del host */}
        {accommodation.hostId && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-lime-200">Host</h3>
            <p>
              <strong className="text-lime-200">Name:</strong>
              <Link
                to={`/host/${accommodation.hostId._id}`} // Enlace dinámico con ID del host
                className="text-white hover:text-gray-600 transition duration-300"
              >
                {accommodation.hostId.name}
              </Link>
            </p>
          </div>
        )}

        {/* Mostrar la cantidad de reseñas y la media de calificaciones */}
        <div className="text-lime-200">
          <h3>{totalReviews} Reseñas</h3>
          <p>Average Rating: {averageRating.toFixed(1)} / 5</p>
        </div>

        {/* Mostrar las reviews */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-lime-200">Reviews</h3>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
                <Rating rating={review.rating || 0} />
                {review.review ? (
                  <p className="mt-2 text-gray-300">{review.review}</p>
                ) : (
                  <p className="mt-2 text-gray-400">No comment provided.</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-300">No reviews yet.</p>
          )}
        </div>

        {/* Nueva review */}
        <div className="text-lime-200 mt-6">
          <RatingWithReview onSubmit={handleReviewSubmit} />
        </div>

        {/* Formulario de creación de reserva */}
        <form
          onSubmit={handleSubmit}
          className="bg-black bg-opacity-75 p-6 rounded-lg shadow-md w-full mt-8"
        >
          <h2 className="text-2xl font-bold text-center text-white mb-6">
            Create Booking
          </h2>

          <div className="mb-4">
            <label htmlFor="dateFrom" className="block text-gray-400">
              Date From:
            </label>
            <input
              type="date"
              name="dateFrom"
              value={bookingDetails.dateFrom}
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
              value={bookingDetails.dateTo}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-600 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
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

export default AccommodationDetailsGuest;
