import "./AddressForm.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { setAddress, TotalShippingFee } from "../../slices/cartSlice";

const AddressForm = ({ setAddressForm }) => {
  const { userInfo } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);

  const editShow = () => {
    setShow(!show);
  };

  const showChangeAddComponent = () => {
    setShow(false);
  };

  const setAddressDefault = (add) => {
    dispatch(setAddress(add));
    dispatch(TotalShippingFee({ cartItems, add }));
  };

  return (
    <div className="addressform-container">
      <p className="close-button" onClick={() => setAddressForm(false)}>
        <FaWindowClose />
      </p>
      {show ? (
        <div>
          <p onClick={() => showChangeAddComponent()}>
            change address
            <hr></hr>
            OR
          </p>
        </div>
      ) : (
        <div>
          {userInfo.address.map((add) => {
            const { city, state, street, pincode } = add;
            const shortAdd = `${street}, ${city}, ${state}, ${pincode}`;
            return (
              <div key={add._id} className="address-item-container">
                <p>{shortAdd}</p>
                <button onClick={() => setAddressDefault(add)}>select</button>
              </div>
            );
          })}
          OR
        </div>
      )}

      {show ? (
        <div>
          <div className="addressform-form">
            <form>
              <input placeholder="Street"></input>
              <input placeholder="City"></input>
              <input placeholder="State"></input>
              <input placeholder="Country"></input>
              <input placeholder="Pincode"></input>
              <input placeholder="loc(lng, lat)"></input>
            </form>
          </div>

          <div className="btn-address-container">
            <button> Add Address</button>
          </div>
        </div>
      ) : (
        <>
          <hr></hr>
          <p
            onClick={() => {
              editShow();
            }}
          >
            add new address'
          </p>
        </>
      )}
    </div>
  );
};

export default AddressForm;
