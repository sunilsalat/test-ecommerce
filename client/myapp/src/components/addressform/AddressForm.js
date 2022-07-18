import "./AddressForm.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { setAddress, addCartAddress } from "../../slices/cartSlice";
import { addUserAddress } from "../../slices/userProfileSlice";

const AddressForm = ({ toggleAddresFormVisiblity }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.profile);

  const setAddressDefault = (add) => {
    dispatch(setAddress(add));
    dispatch(addCartAddress({ add }));
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
      <p
        className="close-button"
        onClick={() => toggleAddresFormVisiblity(false)}
      >
        <FaWindowClose />
      </p>

      {/* on clicking selectExisting address show all user address */}
      {show ? (
        <div>
          <p className="text" onClick={() => setShow(false)}>
            Select Exisiting Address
          </p>
          <p>OR</p>
        </div>
      ) : (
        <div>
          {userInfo &&
            userInfo.address.map((add) => {
              const { city, state, street, pincode } = add;
              const shortAdd = `${street}, ${city}, ${state}, ${pincode}`;
              return (
                <div key={add._id} className="address-item-container">
                  <span>{shortAdd}</span>
                  <button onClick={() => setAddressDefault(add)}>SELECT</button>
                </div>
              );
            })}
        </div>
      )}

      {/* on clicking add address show blank address form  */}
      {show ? (
        <div className="addressform">
          <div className="addressform-title">
            <h3>Add Address</h3>
          </div>
          <div className="addressform-form">
            <div>
              <form onSubmit={(e) => formSubmitHandler(e)}>
                <input name="street" required placeholder="Street"></input>
                <input name="city" required placeholder="City"></input>
                <input name="state" required placeholder="State"></input>
                <input name="country" required placeholder="Country"></input>
                <input name="pincode" required placeholder="Pincode"></input>
                <input name="loc" required placeholder="loc(lng, lat)"></input>
                <div className="btn">
                  <button type="submit">ADD</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <>
          <p>OR</p>

          <p
            className="text"
            onClick={() => {
              setShow(!show);
            }}
          >
            Add New Address
          </p>
        </>
      )}
    </div>
  );
};

export default AddressForm;
