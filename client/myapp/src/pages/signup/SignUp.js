import "./SignUp.css";
import { userRegister } from "../../slices/userRegisterSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const { userInfo, success, error } = useSelector((state) => state.register);
  const { userInfo: info } = useSelector((state) => state.profile);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userRegister({ name, email, password }));
  };

  useEffect(() => {
    if (info) {
      navigate("/");
    }
    if (success) {
      setEmail("");
      setName("");
      setPassword("");
    }

    // TODO --> return a function to clean up error messages
  }, [navigate, success, dispatch]);

  return (
    <div className="signup-main-container ">
      <div className="inner-container">
        <div className="title">
          <h2>LoginForm</h2>
        </div>
        <div className="form-container">
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
            <input
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button className="login-btn" type="submit">
              Submit
            </button>
          </form>
        </div>
        <div>
          <h4>Already Registerd?</h4>
          <p onClick={() => navigate("/signin")}>SignIn</p>
        </div>
        {error && (
          <div>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
