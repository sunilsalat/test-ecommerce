import { useNavigate } from "react-router-dom";
import "./continueBtn.css";

const ContinueButton = ({ text, path }) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`${path}`, { state: { value: path } });
  };

  return (
    <div className="continue-btn-container">
      <button onClick={() => handleSubmit()} to={path} className="continue-btn">
        CONTINUE TO {text}
      </button>
    </div>
  );
};

export default ContinueButton;
