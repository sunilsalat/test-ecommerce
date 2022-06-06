import "./SignIn.css";
import { getUserInfoFromServer } from "../../slices/userInfoSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const SignIn = () => {
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(getUserInfoFromServer({}));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="email"></input>
        <input type="text" placeholder="password"></input>
        <button type="submit"></button>
      </form>
    </div>
  );
};

export default SignIn;
