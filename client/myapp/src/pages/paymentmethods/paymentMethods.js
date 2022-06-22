import CheckOutStep from "../../components/checkoutStepCompoment/checkoutStep";
import ContinueButton from "../../components/continuebtn/continueBtn";

const PaymentMethod = () => {
  return (
    <div>
      <CheckOutStep step1 step2 step3 />,
      <div>
        <div>SelectPaymentMehod:</div>
        <div>stripe</div>
        <div>paypal</div>
      </div>
      <ContinueButton text={"ORDER"} path={"/order"} />
    </div>
  );
};

export default PaymentMethod;
