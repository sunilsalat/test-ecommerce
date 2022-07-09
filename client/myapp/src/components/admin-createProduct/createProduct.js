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
  const [show, hide] = useState(true);

  const { categories } = useSelector((state) => state.products);
  const { subCats } = useSelector((state) => state.allSellerProduct);
  const { userInfo } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  // dummy payload to initialize product
  const obj = {
    title: "",
    description: "",
    category: "",
    subCategory: "",
    unit: 1,
    weight: "",
    price: "",
    image: "",
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
    // hide the save button as soon as file on select
    hide(false);

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

    setData((data) => ({ ...data, image: res.data }));

    hide(true);
  };

  const handleSubmit = async ({ method, id }) => {
    dispatch(createProduct({ data, method, id })).then(() => {
      toggleComponent(false);
      setAddingProduct(false);
    });
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
      <div className="form">
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
          required
        />
        <input
          placeholder="description"
          name="description"
          type="text"
          value={data.description}
          onChange={(e) => {
            setData((data) => ({ ...data, description: e.target.value }));
          }}
          required
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
          placeholder="unit"
          name="unit"
          type="number"
          value={data.unit}
          min="0"
          onInput="validity.valid||(value='');"
          onChange={(e) => {
            setData((data) => ({ ...data, unit: e.target.value }));
          }}
          required
        />
        <input
          placeholder="weight in grams"
          name="weight"
          type="number"
          value={data.weight}
          min="0"
          onInput="validity.valid||(value='');"
          onChange={(e) => {
            setData((data) => ({ ...data, weight: e.target.value }));
          }}
          required
        />
        <input
          placeholder="price"
          type="number"
          name="price"
          value={data.price}
          min="0"
          oninput="validity.valid||(value='');"
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

        {addingProduct
          ? show && (
              <button
                className="btn"
                type="button"
                onClick={(e) => handleSubmit({ method: "new" })}
              >
                Add Product
              </button>
            )
          : show && (
              <button
                className="btn"
                type="button"
                onClick={(e) =>
                  handleSubmit({ method: "update", id: product._id })
                }
              >
                Save Product
              </button>
            )}
      </div>
    </div>
  );
};

export default AddProduct;
