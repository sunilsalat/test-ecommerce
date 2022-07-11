import "./RatingAndReview.css";

import { BsStarFill } from "react-icons/bs";
import { useSelector } from "react-redux";

const RatingAndReview = ({ review }) => {

  const {userInfo} = useSelector(state => state.profile)
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
      <span className="user-name">{review?.userId?._id ===  userInfo.id? 'you': review?.userId?.name }</span>
    </div>
  );
};

export default RatingAndReview;
