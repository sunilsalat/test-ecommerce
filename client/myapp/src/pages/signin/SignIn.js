import "./SignIn.css";
import { userLogin } from "../../slices/userLoginSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();

  const query = new URLSearchParams(search);

  const { userInfo, error } = useSelector((state) => state.profile);

  const path = query.get("path") ? query.get("path") : "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin({ email, password }));
  };

  useEffect(() => {
    if (userInfo && userInfo.id) {
      navigate(path);
    }
  }, [userInfo, navigate]);

  return (
    <div className="signin-main-container">
      <div className="inner-container">
        <div className="title">
          <h2>LoginForm</h2>
        </div>
        <div className="form-container">
          <form className="form" onSubmit={handleSubmit}>
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
          <h4>Don have account?</h4>
          <p onClick={() => navigate("/signup")}>SignUp</p>
        </div>
        <div>
          {error && (
            <div>
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
