import "./Navbar.css";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../../slices/userLoginSlice";
import { FaSearch, FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getAllCartItems } from "../../slices/cartSlice";

const Navbar = () => {
  const [title, setTitle] = useState("");
  const { userInfo } = useSelector((state) => state.profile);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = () => {
    setSearchParams({ title: title.trim() });
  };

  const haneleLogOut = () => {
    dispatch(userLogout({}));
    navigate('/')
    
  };

  useEffect(() => {
    if (!cartItems) {
      dispatch(getAllCartItems());
    }
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="left-section">
          <Link to="/">MY-STORE</Link>
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
                  <li onClick={() => haneleLogOut()}>LogOut</li>
                  <li>
                    <Link to="/">
                      {userInfo.name ? `Hi, ${userInfo.name}` : "Guest"}
                    </Link>
                  </li>
                  {userInfo?.role == "seller" ? (
                    <li>
                      <Link to="/admin">Admin</Link>
                    </li>
                  ) : null}

                  <li>
                    <Link to="/cart">
                      <FaShoppingCart />
                      {cartItems?.length > 0 ? (
                        <span
                          style={{
                            backgroundColor: "white",
                            padding: "1px",
                            color: "steelblue",
                          }}
                        >
                          {cartItems.length}
                        </span>
                      ) : null}
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
                      <FaShoppingCart />
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
