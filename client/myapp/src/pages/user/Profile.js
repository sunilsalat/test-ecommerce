import "./Profile.css";
import { Link, Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="user-profile-side-container">
        <div>
          <Link to="all-user-orders">Manage Orders</Link>
        </div>
        <div>
          <Link to="all-user-address">Manage Addresses</Link>
        </div>
      </div>
      <div className="user-profile-main-container">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
