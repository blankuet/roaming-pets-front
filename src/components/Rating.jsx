import { PropTypes } from "prop-types";

function Rating({ rating = 0, maxRating = 5, onRatingChange }) {
  const roundedRating = Math.round(rating);
  const stars = [];

  for (let i = 0; i < maxRating; i++) {
    stars.push(
      <span
        key={i}
        className={`cursor-pointer ${i < roundedRating ? 'text-yellow-500' : 'text-gray-300'}`}
        onClick={() => onRatingChange && onRatingChange(i + 1)}
        aria-label={`${i + 1} stars`}
        role="button"
      >
        {i < roundedRating ? '★' : '☆'}
      </span>
    );
  }

  return (
    <div className="text-xl" aria-live="polite">
      {stars}
      <span className="ml-2 text-sm text-gray-600">({rating.toFixed(1)})</span>
    </div>
  );
}

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  maxRating: PropTypes.number,
  onRatingChange: PropTypes.func,
};

export default Rating;
