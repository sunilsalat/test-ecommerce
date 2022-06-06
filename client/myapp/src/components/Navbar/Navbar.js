import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const userInfo = true;
  return (
    <nav className="navbar">
      <div className="left-section">left-section</div>
      <div className="middle-section">middle section-section</div>
      <div className="right-section">
        <div className="nav-links">
          <ul>
            {userInfo ? (
              <>
                <li>
                  <Link to="/">LogOut</Link>
                </li>
                <li>
                  <Link to="/">Profile</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">LogIn</Link>
                </li>
                <li>
                  <Link to="/">SigUp</Link>
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
