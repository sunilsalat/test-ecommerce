import "./AddressForm.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { setAddress, TotalShippingFee } from "../../slices/cartSlice";
import { addUserAddress } from "../../slices/userProfileSlice";

const AddressForm = ({ setAddressForm }) => {
  const { userInfo } = useSelector((state) => state.profile);
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
    dispatch(setAddress(add._id));

    dispatch(TotalShippingFee({ cartItems, add }));
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const data = {};
    for (let t of e.target) {
      if (t.name == "loc") {
        data[t.name] = t.value.split(",");
      }
      data[t.name] = t.value;
    }

    if (data) {
      dispatch(addUserAddress({ data }));
    } else alert("please add all fields");
  };

  return (
    <div className="addressform-container">
      <p className="close-button" onClick={() => setAddressForm(false)}>
        <FaWindowClose />
      </p>
      {show ? (
        <div>
          <p onClick={() => showChangeAddComponent()}>change address</p>
          <hr></hr>
          OR
        </div>
      ) : (
        <div>
          {userInfo &&
            userInfo.address.map((add) => {
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
            <form onSubmit={(e) => formSubmitHandler(e)}>
              <input name="street" required placeholder="Street"></input>
              <input name="city" required placeholder="City"></input>
              <input name="state" required placeholder="State"></input>
              <input name="country" required placeholder="Country"></input>
              <input name="pincode" required placeholder="Pincode"></input>
              <input name="loc" required placeholder="loc(lng, lat)"></input>
              <button type="submit">ADD</button>
            </form>
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
