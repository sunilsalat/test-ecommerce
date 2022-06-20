import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import SignIn from "../pages/signin/SignIn";

const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.profile);

  return userInfo && userInfo.name ? <Outlet /> : <SignIn />;
};

export default ProtectedRoute;
