import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import AdminPanel from "../pages/admin/adminPanel";

const AdminSellerAccess = () => {
  const { userInfo } = useSelector((state) => state.profile);
  // seller, admin can only access
  const allowed_roles = ["seller", "admin"];
  const is_allowed = allowed_roles.includes(userInfo.role);

  return is_allowed ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default AdminSellerAccess;
