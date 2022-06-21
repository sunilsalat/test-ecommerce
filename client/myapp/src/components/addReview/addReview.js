import "./addReview.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProductReveiw } from "../../slices/productDetailSlice";

const AddReveiw = ({ productId }) => {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const dispatch = useDispatch();

  const addReveiwHandler = () => {
    const data = { title, comment, rating, productId };
    dispatch(addProductReveiw({ data }));
  };

  return (
    <div className="review-container-main">
      <h3>WRITE REVIEW</h3>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      ></input>
      <input
        placeholder="Comment"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      ></input>
      <select
        name="star"
        id="star"
        value={rating}
        onChange={(e) => {
          setRating(e.target.value);
        }}
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>

      <button onClick={() => addReveiwHandler(productId)}>ADD</button>
    </div>
  );
};

export default AddReveiw;
