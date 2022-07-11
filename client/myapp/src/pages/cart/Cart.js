import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AddressForm from "../../components/addressform/AddressForm";
import {
  getAllCartItems,
  removeCartItem,
  editCartItem,
  incQty,
  decQty,
} from "../../slices/cartSlice";

const Cart = () => {
  const [showAddressForm, toggleAddresFormVisiblity] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.profile);
  const { cartItems, totalQty, totalPrice, totalShippingFee, address } =
    useSelector((state) => state.cart);

  const shippingAddress =
    address && address.hasOwnProperty("street")
      ? `${address.street}, ${address.city}, ${address.state}, ${address.pincode}`
      : null;

  const alterQuantity = ({ productId, method }) => {
    if (method === "inc") {
      dispatch(incQty(productId));
    }
    if (method === "dec") {
      dispatch(decQty(productId));
    }
    dispatch(editCartItem({ productId, method }));
  };

  const handleRemove = (productId) => {
    dispatch(removeCartItem(productId));
  };

  const showHideAddressForm = () => {
    toggleAddresFormVisiblity(!showAddressForm);
  };

  useEffect(() => {
    if (!cartItems && userInfo) {
      dispatch(getAllCartItems());
    }
  }, []);

  if (!cartItems || cartItems <= 0) {
    return <div>Your cart is empty !</div>;
  }

  return (
    <div className="cart-container">
      <div className="cart-items-container">
        <div className="address-container">
          <div>My Cart({totalQty})</div>
          {shippingAddress ? <div> Deliver To - {shippingAddress}</div> : null}
          <div>
            {showAddressForm ? (
              <div className="modal">
                <AddressForm
                  toggleAddresFormVisiblity={toggleAddresFormVisiblity}
                />
              </div>
            ) : (
              <button onClick={() => showHideAddressForm()}>Add Address</button>
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
                    <button onClick={() => handleRemove(item.productId)}>
                      DELETE
                    </button>
                  </div>
                </div>
                <div className="item-btn">
                  <button
                    onClick={() =>
                      alterQuantity({
                        productId: item.productId,
                        method: "inc",
                      })
                    }
                  >
                    +
                  </button>
                  <span className="item-qty">{item.item_qty}</span>
                  <button
                    onClick={() =>
                      alterQuantity({
                        productId: item.productId,
                        method: "dec",
                      })
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
          {cartItems ? (
            <button
              className="checkOut-btn"
              onClick={() => navigate("/shipping")}
            >
              CHEKOUT
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Cart;
