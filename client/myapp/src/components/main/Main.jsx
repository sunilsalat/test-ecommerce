import Navbar from "../Navbar/Navbar";

const Main = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      sidebar
    </div>
  );
};

export default Main;
