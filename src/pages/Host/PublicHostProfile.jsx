import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RatingWithReview from "../../components/RatingWithReview";
import Rating from "../../components/Rating";

function PublicHostProfile() {
  const { hostId } = useParams();
  const [host, setHost] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    //Obtener los datos del host y sus reviews desde el backend
    const fetchHostData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/host/${hostId}`);
        const data = await response.json();
        console.log(data);
        setHost(data);
        setReviews(data.reviews || []);
      } catch (error) {
        console.error("Error fetching host data:", error);
      }
    };

    fetchHostData();
  }, [hostId]);

  const handleReviewSubmit = async (newReview) => {
    try {
      //Enviar la review al backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/host/${hostId}/review`, {
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

  return (
    <div className="flex flex-col justify-start items-center min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/public/animals.jpg')" }}>

      {host ? (
        <>
          <h1 className="text-5xl font-bold text-lime-200 text-center mb-6 w-full">{host.name} {host.lastname}</h1>
          <div className="bg-black bg-opacity-80 rounded-lg shadow-lg p-6 max-w-lg w-full">
            <div className="flex flex-col items-center mb-6">
              {host.profileImage && (
                <img
                  src={host.profileImage.replace("/upload/", "/upload/w_300/")}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover mb-4 shadow-md"
                />
              )}
              <p className="text-xl font-semibold text-lime-200 mb-2">Name: {host.name}</p>
              <p className="text-xl font-semibold text-lime-200 mb-2">Last Name: {host.lastname}</p>
              <p className="text-xl font-semibold text-lime-200 mb-2">Email: {host.email}</p>
            </div>

            {/* Mostrar la cantidad de reseñas y la media de calificaciones */}
            <div className="review-summary">
              <h3>{totalReviews} Reseñas</h3>
              <p>Calificación media: {averageRating.toFixed(1)} / 5</p>
            </div>

            {/* Mostrar las reviews */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-lime-200">Reviews</h3>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
                    <Rating rating={review.rating} />
                    <p className="mt-2 text-gray-300">{review.review}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-300">No reviews yet.</p>
              )}
            </div>

            {/* Nueva review */}
            <div className="mt-6">
              <RatingWithReview onSubmit={handleReviewSubmit} />
            </div>
          </div>
        </>
      ) : (
        <p className="text-lime-200">Loading...</p>
      )}
    </div>
  );
}

export default PublicHostProfile;
