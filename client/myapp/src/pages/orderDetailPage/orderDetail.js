import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleOrderDetail } from "../../slices/orderDetailSlice";
import "./orderDetail.css";

const OrderDetail = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();

  const { orderDetail: order } = useSelector((state) => state.orderDetail);

  useEffect(() => {
    if (orderId) {
      dispatch(getSingleOrderDetail(orderId));
    }
  }, [orderId]);

  if (!order) {
    return <h2>No Order Found!</h2>;
  }

  return (
    <div className="flex-container">
      {order && (
        <>
          <div className=" justify-text-left mt-2">
            <h1>ORDER {order._id}</h1>
            <p className="order-status">{order.status}</p>
            <p className="mb-2">
              Placed On - {new Date(order.createdAt).toLocaleString()}
            </p>
            <div className="justify-text-left  mb-2">
              <h2>DELIVERY</h2>
              <p className="mtb-5">{JSON.stringify(order.address)}</p>
              <p className="order-paid">
                {order.isDeliverd
                  ? ` Deliverd At -  ${order.deliverdAt}`
                  : "IN TRANSIT"}
              </p>
            </div>
            <div className="justify-text-left mb-2 ">
              <h2>PAYMENT</h2>
              <p className="mtb-5">Paid Through - {order.paymentMethod}</p>
              <p className="order-paid">
                Paid At - {new Date(order.paidAt).toLocaleString()}
              </p>
            </div>
            <div>
              <h2>ORDER ITEMS</h2>
              {order.orderItems?.map((e) => {
                return (
                  <div key={e._id} className="flex-container-between mtb-5">
                    <img className="order-img" src={e.image} />
                    <p>{e.title}</p>
                    <p>
                      {e.qty}*{e.price} = ${e.qty * e.price}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className=" mt-1">
            <h2>ORDER SUMMARY</h2>
            <div className="mt-1">
              <div className="flex-container-between util-align">
                <p>SubTotal</p>
                <p>${order.total}</p>
              </div>
              <div className="flex-container-between util-align">
                <p>Shipping</p>
                <p>${order.shippingFee}</p>
              </div>
              <div className="flex-container-between  util-align">
                <p>Total</p>
                <p>${order.total + order.shippingFee}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetail;
