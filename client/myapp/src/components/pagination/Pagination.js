import { useNavigate } from "react-router-dom";
import "./Pagination.css";

const Pagination = ({ lastPage, path }) => {
  const pages = Array.from(Array(lastPage).keys());
  const navigate = useNavigate();

  const getPaginatedResut = (i) => {
    navigate(`${path}?page=${i}`);
  };

  return (
    <div className="pagination-container">
      {pages.map((i) => {
        return (
          <div
            key={i}
            className="pagination-block"
            onClick={(e) => getPaginatedResut(i+1)}
          >
            {i+1}
          </div>
        );
      })}
    </div>
  );
};

export default Pagination;
