import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllCartItems,
  removeCartItem,
  editCartItem,
} from "../../slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.login);
  const { cartItems, totalQty, totalPrice } = useSelector(
    (state) => state.cart
  );

  const alterQuantity = ({ cartItemId, method }) => {
    dispatch(editCartItem({ cartItemId, method }));
    dispatch(getAllCartItems());
  };

  const handleRemove = (id) => {
    dispatch(removeCartItem(id));
    dispatch(getAllCartItems());
  };

  console.log(userInfo)

  useEffect(() => {
    if (!userInfo || !userInfo.name ) {
      navigate("/signin");
    }
  }, [navigate, dispatch]);

  useEffect(() => {
    dispatch(getAllCartItems());
  }, [dispatch]);

  return (
    <div className="cart-container">
      <div className="cart-items-container">
        {cartItems && cartItems.map((item) => {
          return (
            <div key={item._id} className="item-container">
              <div className="item-image">
                <img src={item.item_image} />
              </div>
              <div className="item-info">
                <h5>{item.item_title}</h5>
                <p>${item.item_price}</p>
                <div>
                  <button onClick={() => handleRemove(item._id)}>DELETE</button>
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
          <hr></hr>
          <h5>Total - ${totalQty * totalPrice}</h5>
        </div>
        <div>
          <button className="checkOut-btn">CHEKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
