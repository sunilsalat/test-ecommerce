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

  useEffect(() => {
    if (!userInfo || !userInfo.name) {
      navigate("/signin");
    }
  }, []);

  useEffect(() => {
    dispatch(getAllCartItems());
  }, [dispatch]);

  return (
    <div className="cart-container">
      <div className="cart-items-container">
        {cartItems.map((item) => {
          return (
            <div key={item._id} className="item-container">
              <div className="item-image">
                <img src={item.item_image} />
              </div>
              <div className="item-info">
                <div>{item.item_title}</div>
                <div>{item.item_price}</div>
                <div>
                  <button onClick={() => handleRemove(item._id)}>delete</button>
                </div>
              </div>
              <div className="item-btn">
                <span>
                  <button
                    onClick={() =>
                      alterQuantity({ cartItemId: item._id, method: "inc" })
                    }
                  >
                    +
                  </button>
                </span>
                <span>{item.item_qty}</span>
                <span>
                  <button
                    onClick={() =>
                      alterQuantity({ cartItemId: item._id, method: "dec" })
                    }
                  >
                    -
                  </button>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="cart-total-container">
        <div className="total-info-container">
          <div>total qty - {totalQty}</div>
          <div>total price - {totalPrice}</div>
        </div>
        <div>chekcout</div>
      </div>
    </div>
  );
};

export default Cart;
