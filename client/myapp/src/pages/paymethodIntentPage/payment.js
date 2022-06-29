import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "../../components/checkOutForm/CheckOutForm";
import { useSelector } from "react-redux";

// getting stripePublic key form backend
// const getStripePublicKey = async () => {
//   const res = await fetch(`/api/v1/util/get-spk`);
//   const data = await res.data();
//   return data.key;
// };

const stripe_promise = loadStripe(
  "pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3"
);

const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { orderId } = useSelector((state) => state.order);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/v1/order/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
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
