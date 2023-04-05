import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { GoPlus, GoDash } from "react-icons/go";
import { BsXSquareFill, BsCheck2, BsCart2 } from "react-icons/bs";
import { Button, createTheme, ThemeProvider } from "@mui/material";
import "./Cart.css";

export default function CartComponent() {
  const userId = useParams();
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
  // useEffect(() => {
  //   // IF OUR ORDER[0] IS NOT UNDEFINED WE WILL SET EACH STATE TO THE CORRECT OBJECT KEY AND WE WILL DO THIS ANYTIME OUR ORDER STORE CHANGES
  //   // IF OUR ORDER[0] IS UNDEFINED WE WILL NOT SET ANY STATE WHICH MEANS WE WONT GET AN ERROR
  //   order[0] !== undefined && setFirstName(order[0].first_name);
  //   order[0] !== undefined && setLastName(order[0].last_name);
  //   order[0] !== undefined && setAddress(order[0].address);
  //   order[0] !== undefined && setCity(order[0].city);
  //   order[0] !== undefined && setZip(order[0].zip);
  //   order[0] !== undefined && setState(order[0].state);
  //   order[0] !== undefined && setEmail(order[0].email);
  //   order[0] !== undefined && setPhone(order[0].phone);
  // }, [order]);

  useEffect(() => {
    dispatch({ type: "ADMIN_GET_SPECIFIC_USER", payload: userId });
    dispatch({ type: "ADMIN_GET_SPECIFIC_ORDER", payload: userId.id });
    dispatch({
      type: "ADMIN_GET_SPECIFIC_ORDER_ITEMS",
      payload: userId.id,
    });
  }, [dispatch]);

  // useEffect(() => {
  //   order[0] !== undefined && setOrderId(order[0].id);
  // }, [order]);

  const paymentType = "0";
  const isPayed = false;
  const isDelivered = false;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const order = useSelector((store) => store.adminReducer.specificOrder);

  console.log(order[0]?.id);
  const user = useSelector((store) => store.adminReducer.specificUser);
  const orderItems = useSelector(
    (store) => store.adminReducer.specificOrderItems
  );

  const [itemEditId, setItemEditId] = useState(0);
  const [itemEditMode, setItemEditMode] = useState(false);
  const [quantity, setQuantity] = useState(1);
  console.log("Order", order);

  function saveUpdate(product_id, price) {
    console.log(product_id, price);
    const orderItems = {
      id: itemEditId,
      quantity: quantity,
      price,
      product_id,
      order_id: order[0].id,
      user_id: Number(userId.id),
    };

    if (quantity <= 0) {
      deleteOrderItem(itemEditId);
      setItemEditMode(false);
      setQuantity(1);
    } else {
      dispatch({ type: "ADMIN_EDIT_ORDER_ITEMS", payload: orderItems });
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
      id: order[0].id,
      first_name: order[0].first_name,
      last_name: order[0].last_name,
      address: order[0].address,
      city: order[0].city,
      state: order[0].state,
      zip: Number(order[0].zip),
      user_id: Number(userId.id),
      email: order[0].email,
      phone: order[0].phone,
      total: cartTotal,
      payment_type: paymentType,
      is_payed: isPayed,
      is_delivered: isDelivered,
    };

    dispatch({ type: "ADMIN_EDIT_ORDER", payload: orderObj });
    history.push(`/admin-order-review/${userId.id}`);
  }

  function deleteOrderItem(id) {
    dispatch({
      type: "ADMIN_DELETE_ORDER_ITEM",
      payload: { id: id, user_id: userId },
    });
    setQuantity(1);
  }

  // useEffect(() => {
  //   total();
  // }, [orderItems]);

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
