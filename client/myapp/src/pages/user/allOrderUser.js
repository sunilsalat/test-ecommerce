import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllOrderOfUser } from "../../slices/orderSlice";

const AllOrderUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { allUserOrder } = useSelector((state) => state.order);

  const handleClick = (id) => {
    navigate(`/order-detail/${id}`);
  };

  useEffect(() => {
    dispatch(getAllOrderOfUser());
  }, []);

  if (!allUserOrder) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>All Orders</h1>
      <table>
        <thead>
          <tr>
            <th scope="col">orderid</th>
            <th scope="col">value</th>
            <th scope="col">placedAt</th>
            <th scope="col">status</th>
            <th scope="col">deliverdAt</th>
            <th scope="col">paidAT</th>
          </tr>
        </thead>
        <tbody>
          {allUserOrder?.map((e) => {
            return (
              <tr key={e._id}>
                <td onClick={() => handleClick(e._id)}>{e._id}</td>
                <td>{e.total}</td>
                <td>{e.createdAt}</td>
                <td>{e.status}</td>
                <td>{e.deliverdAt}</td>
                <td>{e.paidAt}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllOrderUser;
