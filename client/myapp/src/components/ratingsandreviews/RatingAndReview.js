import "./RatingAndReview.css";

import { BsStarFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useCallback, useRef } from "react";

const RatingAndReview = ({ review, currentPage, lastPage, index }) => {
  const { userInfo } = useSelector((state) => state.profile);

  const elemRef = useRef();
  const observer = useCallback((node) => {
    if (elemRef.current) elemRef.current.disconnect();
    elemRef.current = new IntersectionObserver((entries) => {
      if (currentPage < lastPage && entries[0].isIntersecting) {

        

      }
    });
  });

  return (
    <div
      ref={index + 1 === 5 * currentPage ? observer : null}
      className="review-main-container"
    >
      <div className="review-title-container">
        <p>
          {review.rating} <BsStarFill />
        </p>
        <h5>{review.title}</h5>
      </div>
      <div className="review-comment-container">
        <div>{review.comment}</div>
      </div>
      <span className="user-name">
        {review?.userId?._id === userInfo.id ? "you" : review?.userId?.name}
      </span>
    </div>
  );
};

export default RatingAndReview;
