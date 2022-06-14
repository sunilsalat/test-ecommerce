import "./RatingAndReview.css";

import { BsStarFill } from "react-icons/bs";

const RatingAndReview = ({ review }) => {
  return (
    <div className="review-main-container">
      <div className="review-title-container">
        <p>
          {review.rating} <BsStarFill />
        </p>
        <h5>{review.title}</h5>
      </div>
      <div className="review-comment-container">
        <div>{review.comment}</div>
      </div>
      <span className="user-name">{review.userId.name}</span>
    </div>
  );
};

export default RatingAndReview;
