import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { updateOrderPaidAt } from "../../slices/orderSlice";

const PaymentConfirmatoin = () => {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const query = new URLSearchParams(search);

  const payInt = query.get("payment_intent");

  useEffect(() => {
    dispatch(updateOrderPaidAt(payInt)).then((e) => {
      navigate(`/order-detail/${e.payload.id}`);
    });
  }, [payInt]);

  return <></>;
};

export default PaymentConfirmatoin;
