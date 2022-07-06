import "./allProduct.css";
import { useEffect, useState } from "react";
import AddProduct from "../../components/admin-createProduct/createProduct";
import { useDispatch, useSelector } from "react-redux";
import { getAllSellersProduct } from "../../slices/admin/allProductSlice";

const AllProduct = () => {
  const [showComponent, toggleComponent] = useState(false);
  const [product, setProduct] = useState();
  const [addingProduct, setAddingProduct] = useState(false);
  const { allSellerProduct } = useSelector((state) => state.allSellerProduct);

  const dispatch = useDispatch();

  const editProduct = (e) => {
    setProduct(e);
    toggleComponent(true);
  };

  useEffect(() => {
    if (!allSellerProduct) {
      dispatch(getAllSellersProduct());
    }
  }, []);

  return (
    <div>
      <h1>All Products</h1>
      {showComponent ? (
        <AddProduct
          toggleComponent={toggleComponent}
          product={product}
          addingProduct={addingProduct}
          setAddingProduct={setAddingProduct}
        />
      ) : (
        <div className="product-list-container">
          <div className="btn-contianer">
            <button
              onClick={() => {
                setAddingProduct(true);
                toggleComponent(!showComponent);
              }}
            >
              Add Product
            </button>
          </div>
          <div className="product-list-table">
            <table>
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Title</th>
                  <th scope="col">Category</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {allSellerProduct?.map((e) => {
                  return (
                    <tr key={e._id}>
                      <td>{e._id}</td>
                      <td>{e.title}</td>
                      <td>{e.category.title}</td>
                      <td>{e.price}</td>
                      <td>
                        <buttons onClick={(event) => editProduct(e)}>
                          edit
                        </buttons>
                      </td>
                      <td>
                        <button>delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProduct;
