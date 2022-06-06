import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../../slices/userLoginSlice";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const haneleLogOut = () => {
    dispatch(userLogout());
    navigate("/signin");
  };

  return (
    <nav className="navbar">
      <div className="left-section">left-section</div>
      <div className="middle-section">middle section-section</div>
      <div className="right-section">
        <div className="nav-links">
          <ul>
            {userInfo ? (
              <>
                <li onClick={() => haneleLogOut()}>
                  <Link to="/">LogOut</Link>
                </li>
                <li>
                  <Link to="/">
                    {userInfo.name ? `Hi, ${userInfo.name}` : "Guest"}
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/signin">SignIn</Link>
                </li>
                <li>
                  <Link to="/signup">SigUp</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="nav-cart">Cart</div>
      </div>
    </nav>
  );
};

export default Navbar;
