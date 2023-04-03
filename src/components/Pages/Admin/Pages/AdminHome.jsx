import { Button, createTheme, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "../Admin.css";
import AdminNav from "../Components/AdminNav/AdminNav";

export default function Admin() {
  const history = useHistory();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const richlandTheme = createTheme({
    palette: {
      primary: {
        main: "#77afdb",
        contrastText: "#ffcf5f",
      },
      secondary: {
        main: "#ffcf5f",
        contrastText: "#000",
      },
      danger: {
        main: "#b71c1c",
        contrastText: "#fff",
      },
    },
  });

  const products = useSelector((store) => store.product.adminProductReducer);
  const calendars = useSelector((store) => store.calendar);
  console.log(calendars);
  console.log(products);
  useEffect(() => {
    dispatch({ type: "FETCH_PRODUCTS" });
    dispatch({ type: "FETCH_CALENDAR" });
  }, [dispatch]);

  const [productEditId, setProductEditId] = useState(0);
  const [productEditName, setProductEditName] = useState("");
  const [productEditPrice, setProductEditPrice] = useState(0);
  const [productEditSku, setProductEditSku] = useState("");
  const [productEditCalId, setProductEditCalId] = useState(0);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productSku, setProductSku] = useState("");
  const [productCalId, setProductCalId] = useState(0);
  const [productEditMode, setProductEditMode] = useState(false);

  const [calEditMode, setCalEditMode] = useState(false);
  const [calendarName, setCalendarName] = useState("");
  const [editCalName, setEditCalName] = useState("");
  const [calendarEditId, setCalendarEditId] = useState(0);

  function editProduct(id, name, price, sku, cal_id) {
    setProductEditMode(true);
    setProductEditId(id);
    setProductEditName(name);
    setProductEditCalId(cal_id);
    setProductEditPrice(price);
    setProductEditSku(sku);
  }

  function editCalendar(id, cal_name) {
    setCalEditMode(true);
    setCalendarEditId(id);
    setEditCalName(cal_name);
  }

  function saveCalEdit() {
    // console.log(editCalName);
    dispatch({
      type: "EDIT_CALENDAR",
      payload: { id: calendarEditId, calendar_name: editCalName },
    });

    setCalendarEditId(false);
  }

  function saveEditProduct() {
    const prodObj = {
      id: Number(productEditId),
      name: productEditName,
      price: Number(productEditPrice).toFixed(2),
      sku: productEditSku,
      calendar_id: Number(productEditCalId),
    };

    // console.log(prodObj);
    dispatch({ type: "ADMIN_EDIT_PRODUCTS", payload: prodObj });
    setProductEditMode(false);
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
    setProductName("");
    setProductPrice(0);
    setProductSku("");
    setProductCalId(0);
  }

  function createCalendar() {
    dispatch({
      type: "ADD_CALENDAR",
      payload: { calendar_name: calendarName },
    });

    setCalendarName("");
  }

  return (
    <>
      <ThemeProvider theme={richlandTheme}>
        <AdminNav />
        <div className="admin-main-container">
          <div className="admin-home-left">
            <div className="create-product">
              <header className="create-product-header">
                <h2>New Product</h2>
              </header>
              <form className="add-product-form">
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
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ height: 25 }}
                  onClick={createProduct}
                >
                  Add
                </Button>
              </form>
            </div>
            <header className="products-header">
              <h2>Products</h2>
            </header>
            <div className="products">
              {products.map((product) => (
                <div className="product">
                  {productEditMode && product.id === productEditId ? (
                    <>
                      {" "}
                      <div className="product-top">
                        <div className="product-name">
                          <h3>Name</h3>
                          <input
                            className="product-edit-input"
                            type="text"
                            value={productEditName}
                            onChange={(e) => {
                              setProductEditName(e.target.value);
                            }}
                          />
                        </div>
                        <div className="product-price">
                          <h3>Price</h3>
                          <input
                            className="product-edit-input"
                            type="number"
                            value={productEditPrice}
                            onChange={(e) => {
                              setProductEditPrice(e.target.value);
                            }}
                          />
                        </div>
                        <div className="product-calendar">
                          <h3>Calendar</h3>
                          <select
                            className="product-edit-select"
                            name="calendar-select"
                            id="calendar-select"
                            value={productEditCalId}
                            onChange={(e) => {
                              setProductEditCalId(e.target.value);
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
                        </div>
                      </div>
                      <div className="product-bottom">
                        <div className="product-buttons">
                          <Button
                            onClick={saveEditProduct}
                            variant="contained"
                            color="primary"
                            sx={{ width: 50, marginInline: 1 }}
                          >
                            Save
                          </Button>
                          <Button
                            sx={{ width: 50, marginInline: 1 }}
                            variant="contained"
                            color="danger"
                            onClick={() => setProductEditMode(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </>
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
                          <Button
                            onClick={() =>
                              editProduct(
                                product.id,
                                product.name,
                                product.price,
                                product.calendar_id,
                                product.sku
                              )
                            }
                            variant="contained"
                            color="primary"
                          >
                            Edit
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
            <div className="create-calendar">
              <header className="create-product-header">
                <h2>New Calendar</h2>
              </header>
              <form className="add-product-form">
                <input
                  className="product-input"
                  type="text"
                  placeholder="Calendar Name"
                  value={calendarName}
                  onChange={(e) => setCalendarName(e.target.value)}
                />

                <Button
                  variant="contained"
                  color="primary"
                  sx={{ height: 25 }}
                  onClick={createCalendar}
                >
                  Add
                </Button>
              </form>
            </div>
            <div className="products">
              <header>
                <h2>Calendars</h2>
              </header>
              <div className="products">
                {calendars.map((cal) => (
                  <div className="calendar">
                    {calEditMode && cal.id === calendarEditId ? (
                      <>
                        <div className="calendar-top">
                          <div className="calendar-name">
                            <h3>Calendar</h3>
                            <input
                              className="product-edit-input"
                              type="text"
                              value={editCalName}
                              onChange={(e) => {
                                setEditCalName(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="product-bottom">
                          <div className="product-buttons">
                            <Button
                              onClick={saveCalEdit}
                              variant="contained"
                              color="primary"
                              sx={{ width: 50, marginInline: 1 }}
                            >
                              Save
                            </Button>
                            <Button
                              sx={{ width: 50, marginInline: 1 }}
                              variant="contained"
                              color="danger"
                              onClick={() => setCalEditMode(false)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="calendar-top">
                          <div className="product-name">
                            <h3>Calendar</h3>
                            <p>{cal.calendar_name}</p>
                          </div>
                        </div>
                        <div className="product-bottom">
                          <div className="product-buttons">
                            <Button
                              onClick={() =>
                                editCalendar(cal.id, cal.calendar_name)
                              }
                              variant="contained"
                              color="primary"
                            >
                              Edit
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}
