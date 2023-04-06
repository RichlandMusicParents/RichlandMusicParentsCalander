import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { GoPlus, GoDash } from "react-icons/go";
import { BsXSquareFill, BsCheck2, BsCart2 } from "react-icons/bs";
import { Button, createTheme, ThemeProvider } from "@mui/material";
import "./Event.css";
import "../Admin/Components/Cart/Cart.css";

export default function UserCartComponent() {
  // const userId = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

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
  useEffect(() => {
    // IF OUR ORDER[0] IS NOT UNDEFINED WE WILL SET EACH STATE TO THE CORRECT OBJECT KEY AND WE WILL DO THIS ANYTIME OUR ORDER STORE CHANGES
    // IF OUR ORDER[0] IS UNDEFINED WE WILL NOT SET ANY STATE WHICH MEANS WE WONT GET AN ERROR
    orders[0] !== undefined && setFirstName(orders[0].first_name);
    orders[0] !== undefined && setLastName(orders[0].last_name);
    orders[0] !== undefined && setAddress(orders[0].address);
    orders[0] !== undefined && setCity(orders[0].city);
    orders[0] !== undefined && setZip(orders[0].zip);
    orders[0] !== undefined && setState(orders[0].state);
    orders[0] !== undefined && setEmail(orders[0].email);
    orders[0] !== undefined && setPhone(orders[0].phone);
  }, [orders]);
  useEffect(() => {
    dispatch({ type: "GET_USER_EVENT" });
    dispatch({ type: "FETCH_USER_PRODUCTS" });
    dispatch({ type: "FETCH_CALENDAR" });
    dispatch({ type: "GET_NEW_ORDER" });
    dispatch({ type: "FETCH_ORDER_ITEMS" });
  }, [dispatch]);

  useEffect(() => {
    orders[0] !== undefined && setOrderId(orders[0].id);
  }, [orders]);
  const paymentType = "0";
  const isPayed = false;
  const isDelivered = false;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState(0);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const orders = useSelector((store) => store.order.newOrder);

  const user = useSelector((store) => store.user);
  const orderItems = useSelector((store) => store.orderItemsReducer);

  const [itemEditId, setItemEditId] = useState(0);
  const [itemEditMode, setItemEditMode] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [orderId, setOrderId] = useState(0);

  function saveUpdate(product_id, price) {
    console.log(product_id, price);
    const orderItems = {
      id: itemEditId,
      quantity: quantity,
      price,
      product_id,
      order_id: Number(orders[0].id),
      user_id: Number(user.id),
    };

    if (quantity <= 0) {
      deleteOrderItem(itemEditId);
      setItemEditMode(false);
      setQuantity(1);
    } else {
      dispatch({ type: "EDIT_ORDER_ITEMS", payload: orderItems });
      setItemEditMode(false);
      setQuantity(1);
    }
  }

  function updateItemAdd(id, itemQuantity) {
    setItemEditMode(true);
    setItemEditId(id);
    setQuantity(itemQuantity + 1);
  }

  function updateItemMinus(id, itemQuantity) {
    setItemEditMode(true);
    setItemEditId(id);
    if (itemQuantity === 1) {
      deleteOrderItem(id);
    } else {
      setQuantity(itemQuantity - 1);
    }
  }
  function saveOrderInfo() {
    const orderObj = {
      first_name: orders[0].first_name,
      last_name: orders[0].last_name,
      address: orders[0].address,
      city: orders[0].city,
      state: orders[0].state,
      zip: orders[0].zip,
      phone: orders[0].phone,
      email: orders[0].email,
      total: cartTotal,
      payment_type: orders[0].payment_type,
      is_payed: false,
      is_delivered: false,
      user_id: user.id,
      id: orders[0].id,
    };

    dispatch({ type: "EDIT_ORDER", payload: orderObj });
    history.push("/customerInvoice");
  }

  function deleteOrderItem(id) {
    dispatch({
      type: "DELETE_ORDER_ITEMS",
      payload: id,
    });
    setQuantity(1);
  }
  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < orderItems.length; i++) {
      totalVal +=
        Number(orderItems[i].price).toFixed(2) * Number(orderItems[i].quantity);
    }
    return totalVal;
    // setCartTotal(totalVal);
  };

  // calculate current cart total
  const cartTotal = total();

  return (
    <>
      <ThemeProvider theme={richlandTheme}>
        {orderItems.length > 0 ? (
          <>
            <section className="admin-cart-true">
              <header className="cart-header">
                <h2>Cart Items</h2>
                <div className="cart-icon-container">
                  <BsCart2 className="cart-icon" />
                  <div className="cart-indicator">
                    <p className="cart-number">{orderItems.length}</p>
                  </div>
                </div>
              </header>
              <article className="cart-body">
                {orderItems.map((item) => (
                  <>
                    <div key={item.id} className="cart-item">
                      {itemEditMode && item.id === itemEditId ? (
                        <>
                          <h3>
                            {item.name}: ${item.price}
                          </h3>
                          <div className="item-inputs">
                            <GoDash
                              className="subtract-icon"
                              onClick={() => setQuantity(quantity - 1)}
                            />
                            <p className="cart-item-quantity">{quantity}</p>
                            <GoPlus
                              className="add-subtract-icon"
                              onClick={() => setQuantity(quantity + 1)}
                            />
                            <BsCheck2
                              className="cart-check-mark"
                              onClick={() =>
                                saveUpdate(item.product_id, item.price)
                              }
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <h3>
                            {item.name}: ${item.price}
                          </h3>
                          <div className="item-inputs">
                            <GoDash
                              className="subtract-icon"
                              onClick={() =>
                                updateItemMinus(item.id, item.quantity)
                              }
                            />
                            <p className="cart-item-quantity">
                              {item.quantity}
                            </p>
                            <GoPlus
                              className="add-subtract-icon"
                              onClick={() =>
                                updateItemAdd(item.id, item.quantity)
                              }
                            />

                            <BsXSquareFill
                              onClick={() => deleteOrderItem(item.id)}
                              className="remove-from-cart-icon"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </>
                ))}
              </article>
              <div className="cart-total">
                <h2>Total: {formatter.format(cartTotal)}</h2>
                <Button variant="contained" onClick={saveOrderInfo}>
                  Checkout
                </Button>
              </div>
            </section>
          </>
        ) : (
          <>
            <section
              className="admin-cart-true"
              style={{
                height: "50%",
                marginLeft: "1rem",
                marginRight: "-1rem",
              }}
            >
              <header className="cart-header">
                <h2>Cart Items</h2>
                <div className="cart-icon-container">
                  <BsCart2 className="cart-icon" />
                  <div className="cart-indicator">
                    <p className="cart-number">{orderItems.length}</p>
                  </div>
                </div>
              </header>
              <article className="cart-body">
                <h2>Cart is empty</h2>
              </article>
              <article className="cart-total">
                <h2>Total: {formatter.format(cartTotal)}</h2>
                <Button variant="contained" onClick={saveOrderInfo}>
                  Checkout
                </Button>
              </article>
            </section>
          </>
        )}
      </ThemeProvider>
    </>
  );
}
