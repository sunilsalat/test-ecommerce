import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const getStripePublicKey = async () => {
  const res = await fetch(`/api/v1/util/get-ssk`);

  const data = await res.data();

  return data.key;
};

const stripe_promise = loadStripe(await getStripePublicKey());

const Payment = () => {
  return <div></div>;
};

export default Payment;
