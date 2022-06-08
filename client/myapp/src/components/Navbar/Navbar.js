import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../slices/productsSlics";
import { userLogout } from "../../slices/userLoginSlice";
import { FaSearch, FaRegUserCircle, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log("button clicked");
  };


  const redirectToHome = ()=>{
    console.log('slkdfjlk')
    dispatch(getAllProducts({cat:'all'}))
    navigate('/')

  }

  const haneleLogOut = () => {
    dispatch(userLogout());
    navigate("/signin");
  };

  return (
    <>
      <nav className="navbar">
        <div className="left-section">
          <Link to="/" onClick={()=>redirectToHome()}>MY-STORE</Link>
        </div>
        <div className="middle-section">
          <input type="search" placeholder="Search"></input>
          <button onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>
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
                    <Link to="/signin">
                      <FaRegUserCircle /> Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/signin">
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
