import "./createProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubCat } from "../../slices/admin/allProductSlice";

const AddProduct = ({ toggleComponent }) => {
  const { categories } = useSelector((state) => state.products);
  const { subCats } = useSelector((state) => state.allSellerProduct);
  const { userInfo } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  const getAllSubCats = (categoryId) => {
    dispatch(getAllSubCat(categoryId));
  };

  const hanldeSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    const newdata = Object.fromEntries(data.entries());

    console.log(newdata);

    const res = await fetch("/api/v1/util/upload-img ", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: JSON.stringify({ dist: "skfjslkjf" }),
    });

    const val = await res.json();
  };

  return (
    <div className="add-product-form">
      <button onClick={() => toggleComponent()}>Cancle</button>
      <form onSubmit={(e) => hanldeSubmit(e)}>
        <input placeholder="title" name="title" type="text" />
        <input placeholder="description" name="description" type="text" />
        <select
          id="category"
          name="category"
          required
          onChange={(e) => getAllSubCats(e.target.value)}
        >
          <option>Select Suitable Category</option>
          {categories?.map((e) => {
            return (
              <option key={e._id} value={e._id}>
                {e.title}
              </option>
            );
          })}
        </select>
        <select id="subcategory" name="subcategory" required>
          <option>Select Suitable subcategory</option>
          {subCats?.map((e) => {
            return (
              <option key={e._id} value={e._id}>
                {e.title}
              </option>
            );
          })}
        </select>
        <input placeholder="seller" name="seller" value={userInfo.id} hidden />
        <input placeholder="unit" name="unit" type="Number" />
        <input placeholder="weight in grams" name="weight" type="Number" />
        <input placeholder="price" type="Number" name="price" />
        <label htmlFor="myfile">Select Images To Upload</label>
        <input type="file" id="myfile" name="myfile" multiple />

        <button type="submit" className="btn">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
