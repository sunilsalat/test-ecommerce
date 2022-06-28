import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../../slices/orderSlice";

const Order = () => {
  const dispatch = useDispatch();

  const proccedToPayment = () => {
    dispatch(placeOrder({}));
  };

  return (
    <div>
      order
      <button onClick={() => proccedToPayment()}>place Order</button>
    </div>
  );
};

export default Order;
