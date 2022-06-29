import "./order.css";
import { useDispatch, useSelector } from "react-redux";
import CheckOutStep from "../../components/checkoutStepCompoment/checkoutStep";
import { placeOrder } from "../../slices/orderSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Order = () => {
  const { cartItems, address, totalPrice, totalShippingFee } = useSelector(
    (state) => state.cart
  );

  const { paymentMethod } = useSelector((state) => state.order);

  const shortAddress = `${address.street}, ${address.city}, ${address.state}, ${address.pincode}`;

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const proccedToPayment = () => {
    dispatch(placeOrder({}));
    navigate('/')
  };

  return (
    <div>
      <div>
        <CheckOutStep step1 step2 step3 step4 />
      </div>
      <div className="flex-container-around">
        <div className="mt-1">
          <div className="util-text-align">
            <h2>SHIPPING TO:</h2>
            <p>{shortAddress}</p>
          </div>
          <div className="util-text-align">
            <h2>PAYMENT METHOD:</h2>
            <p>{paymentMethod}</p>
          </div>
          <div className="util-text-align">
            <h2>ORDER ITEMS:</h2>
            <div>
              {cartItems?.map((e) => {
                return (
                  <div key={e._id} className="flex-container-between">
                    <p>{e.item_title}</p>
                    <p>
                      {e.item_qty}*{e.item_price} = ${e.item_qty * e.item_price}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className=" mt-1">
          <h2>ORDER SUMMARY</h2>
          <div className="mt-1">
            <div className="flex-container-between util-align">
              <p>SubTotal</p>
              <p>${totalPrice}</p>
            </div>
            <div className="flex-container-between util-align">
              <p>Shipping</p>
              <p>${totalShippingFee}</p>
            </div>
            <div className="flex-container-between  util-align">
              <p>Total</p>
              <p>${totalPrice + totalShippingFee}</p>
            </div>
          </div>
          <button className="mt-1 btnPay" onClick={() => proccedToPayment()}>
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
