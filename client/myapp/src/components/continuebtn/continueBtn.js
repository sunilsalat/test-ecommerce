import "./continueBtn.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const ContinueButton = ({ text, path }) => {
  return (
    <div className="continue-btn-container">
      <Link to={path} className="continue-btn">
        CONTINUE TO {text}
      </Link>
    </div>
  );
};

export default ContinueButton;
