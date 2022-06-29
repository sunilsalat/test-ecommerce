import "./checkoutStep.css";
import { Link } from "react-router-dom";

const CheckOutStep = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="steps-container">
      <div className="nav-link">
        {step1 ? <span>login</span> : <Link to="/signin"> signin</Link>}
      </div>
      <hr />
      <div className="nav-link">
        {step2 ? <Link to="/shipping">address</Link> : <span>address</span>}
      </div>
      <hr />
      <div className="nav-link">
        {step3 ? (
          <Link to="/payment">paymentMethod </Link>
        ) : (
          <span>payment</span>
        )}
      </div>
      <hr />
      <div className="nav-link">
        {step4 ? (
          <Link to="/order">placeOrder</Link>
        ) : (
          <span>orderSummary</span>
        )}
      </div>
    </div>
  );
};

export default CheckOutStep;
