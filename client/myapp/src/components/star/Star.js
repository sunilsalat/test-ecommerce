import { BsStarFill, BsStar } from "react-icons/bs";
const Star = ({ count }) => {
  if (count === 1) {
    return (
      <div className="star-container">
        <BsStarFill />
        <BsStar />
        <BsStar /> <BsStar /> <BsStar />
      </div>
    );
  }
  if (count === 2) {
    return (
      <div className="star-container">
        <BsStarFill />
        <BsStarFill />
        <BsStar /> <BsStar /> <BsStar />
      </div>
    );
  }
  if (count === 3) {
    return (
      <div className="star-container">
        <BsStarFill />
        <BsStarFill />
        <BsStarFill /> <BsStar /> <BsStar />
      </div>
    );
  }
  if (count === 4) {
    return (
      <div className="star-container">
        <BsStarFill />
        <BsStar />
        <BsStar /> <BsStar /> <BsStar />
      </div>
    );
  }
  if (count === 5) {
    return (
      <div className="star-container">
        <BsStar />
        <BsStar />
        <BsStar /> <BsStar /> <BsStar />
      </div>
    );
  }
};

export default Star;
