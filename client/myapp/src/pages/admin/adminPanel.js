import { Link, Outlet } from "react-router-dom";
import "./adminPanel.css";

const AdminPanel = () => {
  return (
    <div className="admin-panel-container">
      <div className="admin-panel-side-container">
        <div>
          <Link to="all-product">Products</Link>
        </div>
        <div>
          <Link to="all-order">all order</Link>
        </div>
      </div>
<<<<<<< HEAD
      {/* nested outlet must be called seperately  */}
=======
>>>>>>> e7d70c2871b52ecafd9c4a97b0ba41bde6d8e95b
      <div className="admin-panel-content-container">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
