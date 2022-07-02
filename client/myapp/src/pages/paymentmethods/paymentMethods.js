import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CheckOutStep from "../../components/checkoutStepCompoment/checkoutStep";
import ContinueButton from "../../components/continuebtn/continueBtn";
import { setPaymentMethod } from "../../slices/orderSlice";

const PaymentMethod = () => {
  const { address } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { state } = useLocation();
  if (!state || state.value !== "/shipping") {
    navigate("/");
  }

  const handleChange = (e) => {
    dispatch(setPaymentMethod(e.target.value));
  };

  useEffect(() => {
    if (!address || !address.street) {
      navigate("/shipping");
    }
  }, []);

  return (
    <div>
      <CheckOutStep step1 step2 step3 />,
      <div>
        <div>SelectPaymentMethod:</div>
        <select name="paymentMethod" onChange={(e) => handleChange(e)}>
          <option value="stripe">Stripe</option>
          <option value="paypal">Paypal</option>
        </select>
      </div>
      <ContinueButton text={"ORDER"} path={"/order"} />
    </div>
  );
};

export default PaymentMethod;
