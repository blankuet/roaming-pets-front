import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RatingWithReview from "../../components/RatingWithReview";
import Rating from "../../components/Rating";

function AccommodationDetailsGuest() {
  const { accommodationId } = useParams();
  const [accommodation, setAccommodation] = useState(null);
  const [reviews, setReviews] = useState([]);

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

  const handleReviewSubmit = async (newReview) => {
    try {
      //Enviar la review al backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/accommodation/${accommodationId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
      });
      const savedReview = await response.json();
      setReviews([...reviews, savedReview]);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 ? reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / totalReviews : 0;

  if (!accommodation) {
    return <div className="text-white text-center">Loading...</div>;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-900"
      style={{ backgroundImage: "url('/public/animals.jpg')" }}
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
                    {/* Mostrar el comentario de la review */}
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
      </div>
    </div>
  );
}

export default AccommodationDetailsGuest;
