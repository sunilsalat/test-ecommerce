import { getAllOrdersOfSeller } from "../../slices/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const AllOrder = () => {
  const dispatch = useDispatch();
  const navigat = useNavigate();
  const { allSellersOrder } = useSelector((state) => state.order);

  const handleClick = (id) => {
    navigat(`/order-detail/${id}`);
  };

  useEffect(() => {
    dispatch(getAllOrdersOfSeller());
  }, []);

  if (!allSellersOrder) {
    return <div>Loading....</div>;
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
          {allSellersOrder?.map((e) => {
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

export default AllOrder;
