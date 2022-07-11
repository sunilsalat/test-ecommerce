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
      {/* nested outlet must be called seperately  */}
      <div className="admin-panel-content-container">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
