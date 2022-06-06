import { useEffect, useState } from "react";
import { Navigate, Route } from "react-router-dom";

const AuthWrapper = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const checkUser = async () => {
      const res = await fetch("/api/v1/auth/root-user");
      if (res.status === 200) {
        setIsAuthenticated(true);
      }
    };
    checkUser();
  }, []);

  console.log(isAuthenticated);

  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    return <Navigate to="/signin" />;
  }



  //   return (
  //     <>
  //       {isAuthenticated && <Route path={props.path} element={props.element} />}
  //     </>
  //   );
};

export default AuthWrapper;
