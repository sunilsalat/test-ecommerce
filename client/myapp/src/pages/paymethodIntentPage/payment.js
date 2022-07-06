import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "../../components/checkOutForm/CheckOutForm";
import { useNavigate, useLocation } from "react-router-dom";

// getting stripePublic key form backend
// const getStripePublicKey = async () => {
//   const res = await fetch(`/api/v1/util/get-spk`);
//   const data = await res.data();
//   return data.key;
// };


const Payment = () => {
  const stripe_promise = loadStripe(process.env.REACT_APP_STRIPE_PK);
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state || state.value !== "/order") {
    navigate("/");
  }

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/v1/order/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: state.id }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripe_promise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
