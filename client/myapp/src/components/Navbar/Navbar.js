import "./Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../../slices/userLoginSlice";
import { FaSearch, FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const [title, setTitle] = useState("");
  const { userInfo } = useSelector((state) => state.profile);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const search = useLocation();

  const query = new URLSearchParams(search);
  const cat = query.get("cat");

  const handleSearch = () => {
    navigate(`/?cat=${cat}&title=${title}`);
  };

  const redirectToHome = () => {
    navigate("/");
  };

  const haneleLogOut = () => {
    dispatch(userLogout());
    navigate("/signin");
  };

  return (
    <>
      <nav className="navbar">
        <div className="left-section">
          <Link to="/" onClick={() => redirectToHome()}>
            MY-STORE
          </Link>
        </div>
        <div className="middle-section">
          <input
            type="search"
            placeholder="Search"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <button onClick={() => handleSearch()}>
            <FaSearch />
          </button>
        </div>
        <div className="right-section">
          <div className="nav-links">
            <ul>
              {userInfo && userInfo.name ? (
                <>
                  <li onClick={() => haneleLogOut()}>
                    <Link to="/">LogOut</Link>
                  </li>
                  <li>
                    <Link to="/">
                      {userInfo.name ? `Hi, ${userInfo.name}` : "Guest"}
                    </Link>
                  </li>
                  <li>
                    <Link to="/cart">
                      <FaShoppingCart /> Cart
                      <span
                        style={{
                          backgroundColor: "white",
                          padding: "1px",
                          color: "steelblue",
                        }}
                      >
                        {cartItems && cartItems.length}
                      </span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/signin">
                      <FaRegUserCircle /> Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/cart">
                      <FaShoppingCart /> Cart
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <div className="middle-section-mobile">
        <input type="search" placeholder="Search"></input>
        <button onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>
    </>
  );
};

export default Navbar;
