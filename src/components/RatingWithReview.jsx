import { useState } from "react";
import PropTypes from "prop-types";
import Rating from "./Rating";

function RatingWithReview({ initialRating, initialReview, onSubmit }) {
  const [rating, setRating] = useState(initialRating || 0);
  const [review, setReview] = useState(initialReview || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating, review });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Rate your experience</h3>
        <Rating rating={rating} onRatingChange={setRating} />
      </div>
      <div>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Leave a review"
          className="w-full p-2 border border-gray-300 rounded"
          rows="4"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}

RatingWithReview.propTypes = {
  initialRating: PropTypes.number,
  initialReview: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default RatingWithReview;

