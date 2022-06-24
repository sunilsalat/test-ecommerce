import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CheckOutStep from "../../components/checkoutStepCompoment/checkoutStep";
import ContinueButton from "../../components/continuebtn/continueBtn";
import { setPaymentMethod } from "../../slices/orderSlice";

const PaymentMethod = () => {
  const { address } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [getSearchParams, setSearchParams] = useSearchParams();
  console.log(getSearchParams.get("accessObj"));

  const handleChange = (e) => {
    dispatch(setPaymentMethod(e.target.value));
  };

  useEffect(() => {
    if (!address) {
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
      <ContinueButton
        text={"ORDER"}
        path={"/order"}
        accessObj={"ghghgh"}
        onClick={() => setSearchParams({ new: "ask" })}
      />
    </div>
  );
};

export default PaymentMethod;
