import "./shipping.css";
import CheckOutStep from "../../components/checkoutStepCompoment/checkoutStep";
import AddressForm from "../../components/addressform/AddressForm";
import ContinueButton from "../../components/continuebtn/continueBtn";
import { useSelector } from "react-redux";

const Shipping = () => {
  const { address } = useSelector((state) => state.cart);

  const shortAddress = `${address.street}, ${address.city}, ${address.state}, ${address.pincode}`;

  return (
    <div className="main-shipping-container">
      <div>
        <CheckOutStep step1 step2 />
      </div>
      <div className="shipping-container">
        <div>
          <div className="short-address">
            Shipping To Address: {shortAddress}
          </div>
          <hr></hr>
          <AddressForm />
        </div>
      </div>

      <ContinueButton text={"PAYMENT"} path={'/payment'} />
    </div>
  );
};

export default Shipping;
