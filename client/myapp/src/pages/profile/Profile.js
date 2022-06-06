import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.login);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo || !userInfo.id) {
        navigate('/signin')
    }
  }, []);
  return <div>Profile page </div>;
};

export default Profile;
