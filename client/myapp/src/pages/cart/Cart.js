import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressForm from "../../components/addressform/AddressForm";
import {
  getAllCartItems,
  removeCartItem,
  editCartItem,
  incQty,
  decQty,
} from "../../slices/cartSlice";

const Cart = () => {
  const [showAddressForm, setAddressForm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.login);
  const { cartItems, totalQty, totalPrice, totalShippingFee, address } =
    useSelector((state) => state.cart);

  const alterQuantity = ({ cartItemId, method }) => {
    if (method === "inc") {
      dispatch(incQty(cartItemId));
    }
    if (method === "dec") {
      dispatch(decQty(cartItemId));
    }
    dispatch(editCartItem({ cartItemId, method }));
  };

  const handleRemove = (id) => {
    dispatch(removeCartItem(id));
  };

  const showHideAddressForm = () => {
    setAddressForm(!showAddressForm);
  };

  useEffect(() => {
    if (!userInfo || !userInfo.name) {
      navigate("/signin");
    }
  }, [navigate]);

  useEffect(() => {
    if (!cartItems && userInfo) {
      dispatch(getAllCartItems());
    }
  }, []);

  return (
    <div className="cart-container">
      <div className="cart-items-container">
        <div className="address-container">
          <div>My Cart({totalQty})</div>
          <div>Deliver To - {JSON.stringify(address)}</div>
          <div>
            {showAddressForm ? (
              <div className="modal">
                <AddressForm setAddressForm={setAddressForm} />
              </div>
            ) : (
              <button onClick={() => showHideAddressForm()}>Change</button>
            )}
          </div>
        </div>
        {cartItems &&
          cartItems.map((item) => {
            return (
              <div key={item._id} className="item-container">
                <div className="item-image">
                  <img src={item.item_image} />
                </div>
                <div className="item-info">
                  <h5>{item.item_title}</h5>
                  <p>${item.item_price}</p>
                  <div>
                    <button onClick={() => handleRemove(item._id)}>
                      DELETE
                    </button>
                  </div>
                </div>
                <div className="item-btn">
                  <button
                    onClick={() =>
                      alterQuantity({ cartItemId: item._id, method: "inc" })
                    }
                  >
                    +
                  </button>
                  <span className="item-qty">{item.item_qty}</span>
                  <button
                    onClick={() =>
                      alterQuantity({ cartItemId: item._id, method: "dec" })
                    }
                  >
                    -
                  </button>
                </div>
              </div>
            );
          })}
      </div>

      <div className="cart-total-container">
        <div className="total-info-container">
          <h3>Your cart summary:</h3>
          <p>Total Qty - {totalQty}</p>
          <p>SubTotal - ${totalPrice}</p>
          <p>shippingFee - ${totalShippingFee}</p>
          <hr></hr>
          <h5>Total - ${totalShippingFee + totalPrice}</h5>
        </div>
        <div>
          <button className="checkOut-btn">CHEKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
