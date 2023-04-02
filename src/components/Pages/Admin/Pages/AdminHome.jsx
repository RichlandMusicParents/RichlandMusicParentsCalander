import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import logger from "redux-logger";
import "../Admin.css";
import AdminNav from "../Components/AdminNav/AdminNav";

export default function Admin() {
  const history = useHistory();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const products = useSelector((store) => store.product);
  const calendars = useSelector((store) => store.calendar);
  console.log(calendars);
  console.log(products);
  useEffect(() => {
    dispatch({ type: "FETCH_PRODUCTS" });
    dispatch({ type: "FETCH_CALENDAR" });
  }, [dispatch]);

  const [productEditId, setProductEditId] = useState(0);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productSku, setProductSku] = useState("");
  const [productCalId, setProductCalId] = useState(0);
  const [productEditMode, setProductEditMode] = useState(false);

  function editProduct(id, name, price, sku, cal_id) {
    setProductEditMode(true);
    setProductEditId(id);
    setProductName(name);
    setProductCalId(cal_id);
    setProductPrice(price);
    setProductSku(sku);
  }

  function createProduct() {
    const prodObj = {
      name: productName,
      price: productPrice,
      sku: productSku,
      calendar_id: Number(productCalId),
    };

    // console.log(prodObj);

    dispatch({ type: "ADD_PRODUCT", payload: prodObj });
  }

  function deleteProduct(id) {}

  return (
    <>
      {/* <ThemeProvider theme={r}></ThemeProvider> */}
      <AdminNav />
      <div className="main-container">
        <div className="admin-home-left">
          <div className="create-product">
            <header className="create-product-header">
              <h2>New Product</h2>
            </header>
            <form>
              <input
                className="product-input"
                type="text"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              <input
                className="product-input"
                type="number"
                placeholder="Product Price"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
              <input
                className="product-input"
                type="text"
                placeholder="SKU Tag"
                value={productSku}
                onChange={(e) => setProductSku(e.target.value)}
              />
              <select
                className="product-select"
                name="calendar-select"
                id="calendar-select"
                value={productCalId}
                onChange={(e) => {
                  setProductCalId(e.target.value);
                  console.log("Event target", e.target.value);
                }}
              >
                <option value="0">Select Calendar</option>
                {calendars.map((cal) => (
                  <option key={cal.id} value={cal.id}>
                    {cal.calendar_name}
                  </option>
                ))}
              </select>
              <Button onClick={createProduct}>Add</Button>
            </form>
          </div>
          <header className="products-header">
            <h2>Products</h2>
          </header>
          <div className="products">
            {products.map((product) => (
              <div className="product">
                {productEditMode && product.id === productEditId ? (
                  <></>
                ) : (
                  <>
                    <div className="product-top">
                      <div className="product-name">
                        <h3>Name</h3>
                        <p>{product.name}</p>
                      </div>
                      <div className="product-price">
                        <h3>Price</h3>
                        <p>{product.price}</p>
                      </div>
                      <div className="product-calendar">
                        <h3>Calendar</h3>
                        <p>{product.calendar_name}</p>
                      </div>
                    </div>
                    <div className="product-bottom">
                      <div className="product-buttons">
                        <Button onClick={() => editProduct(product.id)}>
                          Edit
                        </Button>
                        <Button onClick={() => deleteProduct(product.id)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="admin-home-right">
          <div className="calendars"></div>
        </div>
      </div>
    </>
  );
}
