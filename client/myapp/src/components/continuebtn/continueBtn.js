import "./continueBtn.css";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const ContinueButton = ({ text, path, accessObj }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({ accessObj });
  }, []);
  return (
    <div className="continue-btn-container">
      <Link to={path} className="continue-btn">
        CONTINUE TO {text}
      </Link>
    </div>
  );
};

export default ContinueButton;
