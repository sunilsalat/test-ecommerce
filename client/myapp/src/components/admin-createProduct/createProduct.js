import "./createProduct.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  getAllSubCat,
} from "../../slices/admin/allProductSlice";
import axios from "axios";
import { useEffect, useState } from "react";

const AddProduct = ({
  toggleComponent,
  product,
  addingProduct,
  setAddingProduct,
}) => {
  const { categories } = useSelector((state) => state.products);
  const { subCats } = useSelector((state) => state.allSellerProduct);
  const { userInfo } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  // dummy payload to initialize data
  const obj = {
    title: null,
    description: null,
    category: "",
    subCategory: "",
    unit: null,
    weight: null,
    price: null,
    image: null,
  };

  const [data, setData] = useState({
    ...obj,
  });

  useEffect(() => {
    // show pre-filled form only when product is being edited
    if (product && product.title && addingProduct === false) {
      setData({ ...product });
    }
  }, []);

  // on category change get all related subcategories
  const getAllSubCats = (categoryId) => {
    dispatch(getAllSubCat(categoryId));
  };

  const handleFileUpload = async (e) => {
    console.log(e.target.files);

    const data = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      data.append("image", e.target.files[i]);
    }

    const res = await axios({
      method: "POST",
      url: "/api/v1/util/upload-img",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  const hanldeSubmit = async (e) => {
    e.preventDefault();
    dispatch(createProduct({ data }));
  };

  useEffect(() => {
    return () => setData({ ...obj });
  }, []);

  return (
    <div className="add-product-form">
      <button
        onClick={() => {
          setAddingProduct(false);
          toggleComponent(false);
        }}
      >
        Cancle
      </button>
      <form onSubmit={(e) => hanldeSubmit(e)}>
        <input
          placeholder="title"
          name="title"
          type="text"
          value={data.title}
          onChange={(e) => {
            setData((data) => ({
              ...data,
              title: e.target.value,
            }));
          }}
        />
        <input
          placeholder="description"
          name="description"
          type="text"
          value={data.description}
          onChange={(e) => {
            setData((data) => ({ ...data, description: e.target.value }));
          }}
        />

        {/* category */}
        {addingProduct ? (
          <select
            id="category"
            name="category"
            required
            onChange={(e) => {
              setData((data) => ({ ...data, category: e.target.value }));
              getAllSubCats(e.target.value);
            }}
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
        ) : null}
        {/* sub-category */}
        {addingProduct ? (
          <select
            id="subcategory"
            name="subcategory"
            onChange={(e) => {
              setData((data) => ({ ...data, subCategory: e.target.value }));
            }}
            required
          >
            <option>Select Suitable subcategory</option>
            {subCats?.map((e) => {
              return (
                <option key={e._id} value={e._id}>
                  {e.title}
                </option>
              );
            })}
          </select>
        ) : null}
        <input
          placeholder="seller"
          name="seller"
          value={userInfo.id}
          hidden
          readOnly
          required
        />
        <input
          placeholder="unit"
          name="unit"
          type="Number"
          value={data.unit}
          onChange={(e) => {
            setData((data) => ({ ...data, unit: e.target.value }));
          }}
          required
        />
        <input
          placeholder="weight in grams"
          name="weight"
          type="Number"
          value={data.weight}
          onChange={(e) => {
            setData((data) => ({ ...data, weight: e.target.value }));
          }}
          required
        />
        <input
          placeholder="price"
          type="Number"
          name="price"
          value={data.price}
          onChange={(e) => {
            setData((data) => ({ ...data, price: e.target.value }));
          }}
          required
        />
        <label htmlFor="myfile">Select Images To Upload</label>
        <input
          type="file"
          id="image"
          name="image"
          multiple
          onChange={(e) => handleFileUpload(e)}
        />

        <button type="submit" className="btn">
          {addingProduct ? "Add Product" : "Save Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
