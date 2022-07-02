import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../../slices/userLoginSlice";
import { FaSearch, FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../slices/productsSlics";
import { getAllCartItems } from "../../slices/cartSlice";

const Navbar = () => {
  const [title, setTitle] = useState("");
  const { userInfo } = useSelector((state) => state.profile);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(getAllProducts({ query_param: { title: title } }));
  };

  const haneleLogOut = () => {
    dispatch(userLogout({}));
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
                  <li>
                    <Link to="/cart">
                      <FaShoppingCart /> Cart
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
