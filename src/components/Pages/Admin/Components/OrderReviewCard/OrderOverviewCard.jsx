import { Button, createTheme, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./AdminReview.css";

export default function OrderOverviewCard() {
  const userId = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch({ type: "ADMIN_GET_SPECIFIC_USER", payload: userId });
    dispatch({ type: "ADMIN_GET_SPECIFIC_ORDER", payload: userId.id });
  }, []);

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

  const orderUser = useSelector((store) => store.adminReducer.specificUser);
  const orderItems = useSelector(
    (store) => store.adminReducer.specificOrderItems
  );
  const orderEvents = useSelector((store) => store.adminReducer.specificEvents);
  const specificOrder = useSelector(
    (store) => store.adminReducer.specificOrder
  );

  console.log("User ID:", Number(userId.id));
  console.log("Order User:", orderUser);
  console.log("Order Items:", orderItems);
  console.log("Order Events:", orderEvents);
  console.log("Order:", specificOrder);

  const [orderInfoEditMode, setOrderInfoEditMode] = useState(false);
  const [orderId, setOrderId] = useState(0);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState(0);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);
  const [paymentType, setPaymentType] = useState("0");
  const [isPayed, setIsPayed] = useState(null);
  const [isDelivered, setIsDelivered] = useState(null);

  useEffect(() => {
    specificOrder[0] !== undefined && setFirstName(specificOrder[0].first_name);
    specificOrder[0] !== undefined && setLastName(specificOrder[0].last_name);
    specificOrder[0] !== undefined && setAddress(specificOrder[0].address);
    specificOrder[0] !== undefined && setCity(specificOrder[0].city);
    specificOrder[0] !== undefined && setZip(specificOrder[0].zip);
    specificOrder[0] !== undefined && setState(specificOrder[0].state);
    specificOrder[0] !== undefined && setEmail(specificOrder[0].email);
    specificOrder[0] !== undefined && setPhone(specificOrder[0].phone);
    specificOrder[0] !== undefined &&
      setPaymentType(specificOrder[0].payment_type);
    specificOrder[0] !== undefined &&
      setIsDelivered(specificOrder[0].is_delivered);
    specificOrder[0] !== undefined && setIsPayed(specificOrder[0].is_payed);
    specificOrder[0] !== undefined && setOrderTotal(specificOrder[0].total);
  }, [specificOrder]);

  useEffect(() => {
    specificOrder[0] !== undefined &&
      setOrderTotal(Number(specificOrder[0].total));
  }, [specificOrder]);

  function saveOrderInfo() {
    const orderObj = {
      id: orderId,
      first_name: firstName,
      last_name: lastName,
      address: address,
      city: city,
      state: state,
      zip: Number(zip),
      user_id: Number(userId.id),
      email: email,
      phone: phone,
      total: orderTotal,
      payment_type: paymentType,
      is_payed: isPayed,
      is_delivered: isDelivered,
    };

    // console.log(orderObj);

    dispatch({ type: "ADMIN_EDIT_ORDER", payload: orderObj });
    setOrderInfoEditMode(false);
  }

  function setOrderEditMode(id) {
    setOrderInfoEditMode(true);
    setOrderId(id);
  }
  return (
    <>
      <ThemeProvider theme={richlandTheme}>
        <div className="admin-review-container">
          <header className="customer-info-header">
            {orderInfoEditMode ? (
              <>
                <h2>Edit Order Details</h2>
              </>
            ) : (
              <>
                <h2>Order Details</h2>
              </>
            )}
          </header>
          {specificOrder.map((orderInfo) => (
            <>
              {orderInfoEditMode ? (
                <article className="customer-info-body">
                  <div className="order-info">
                    <div className="customer-info">
                      <header className="info-header">
                        <h3>Contact Info</h3>
                      </header>
                      <div className="name-input-container">
                        <input
                          id="review-input"
                          className="name-input"
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                          id="review-input"
                          className="name-input"
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>

                      <input
                        id="review-input"
                        className="non-name-input"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <input
                        id="review-input"
                        className="non-name-input"
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="shipping-address">
                      <header className="shipping-info-header">
                        <h3>Shipping</h3>
                      </header>
                      <input
                        id="review-input"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      <div className="city-state-inputs">
                        <input
                          id="review-input"
                          className="city-input"
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                        <input
                          id="review-input"
                          className="state-input"
                          type="text"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                        />
                      </div>

                      <input
                        id="review-input"
                        className="zip-input"
                        type="text"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                      />
                    </div>
                    <div className="order-status">
                      <header className="order-status-header">
                        <h3>Order Status</h3>
                      </header>

                      <div className="is-payed-radios">
                        <header>
                          <p className="radio-header">Payed?</p>
                        </header>
                        <div className="is-payed-inputs">
                          <div className="radio-group">
                            <input
                              type="radio"
                              id="yes"
                              value={isPayed}
                              onChange={(e) => setIsPayed(e.target.value)}
                            />
                            <label htmlFor="yes">Yes</label>
                          </div>
                          <div className="radio-group">
                            <input
                              type="radio"
                              id="no"
                              value={isPayed}
                              onChange={(e) => setIsPayed(e.target.value)}
                            />
                            <label htmlFor="no">No</label>
                          </div>
                        </div>
                      </div>
                      <div className="is-payed-radios">
                        <header>
                          <p className="radio-header">Delivered?</p>
                        </header>
                        <div
                          className="is-payed-inputs"
                          id="is-delivered-radio"
                        >
                          <input
                            type="radio"
                            id="yes"
                            name="is-delivered-radio"
                            value={true}
                            onChange={(e) => setIsDelivered(e.target.value)}
                          />
                          <label htmlFor="yes">Yes</label>
                          <input
                            type="radio"
                            id="no"
                            name="is-delivered-radio"
                            value={false}
                            onChange={(e) => setIsDelivered(e.target.value)}
                          />
                          <label htmlFor="no">No</label>
                        </div>
                      </div>
                      <div className="payment-drop-down">
                        <p>Payment Type:</p>
                        <select
                          className="payment_select"
                          id="payment_select"
                          value={paymentType}
                          onChange={(e) => setPaymentType(e.target.value)}
                        >
                          <option value="0">Select</option>
                          <option value="Cash">Cash</option>
                          <option value="Check">Check</option>
                          <option value="Card">Card</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="order-buttons">
                    <Button
                      sx={{
                        width: 150,
                        margin: 1,

                        fontSize: 15,
                      }}
                      variant="contained"
                      onClick={saveOrderInfo}
                    >
                      Save
                    </Button>
                    <Button
                      sx={{
                        width: 150,
                        margin: 1,
                        fontSize: 15,
                      }}
                      variant="contained"
                      color="secondary"
                      onClick={() => setOrderInfoEditMode(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </article>
              ) : (
                <article className="customer-info-body">
                  <div className="order-info">
                    <div className="customer-info">
                      <header className="info-header">
                        <h3>Contact Info</h3>
                      </header>
                      <p>
                        {orderInfo.first_name} {orderInfo.last_name}
                      </p>
                      <p>{orderInfo.email}</p>
                      <p>{orderInfo.phone}</p>
                    </div>
                    <div className="shipping-address">
                      <header className="shipping-info-header">
                        <h3>Shipping</h3>
                      </header>
                      <p>{orderInfo.address}</p>
                      <p>
                        {orderInfo.city}, {orderInfo.state}
                      </p>

                      <p>{orderInfo.zip}</p>
                    </div>
                    <div className="order-status">
                      <header className="order-status-header">
                        <h3>Order Status</h3>
                      </header>
                      {orderInfo.is_payed ? (
                        <>
                          <p>Payed: Yes</p>
                        </>
                      ) : (
                        <>
                          <p>Payed: No</p>
                        </>
                      )}
                      {orderInfo.is_delivered ? (
                        <>
                          <p>Delivered: Yes</p>
                        </>
                      ) : (
                        <>
                          <p>Delivered: No</p>
                        </>
                      )}
                      <p>Payment Method: {orderInfo.payment_type}</p>
                    </div>
                  </div>
                  <div className="order-buttons">
                    <Button
                      sx={{
                        width: 150,
                        marginBlock: 1,
                        fontSize: 15,
                      }}
                      variant="contained"
                      onClick={() => setOrderEditMode(orderInfo.id)}
                    >
                      Edit Info
                    </Button>
                  </div>
                </article>
              )}
            </>
          ))}
        </div>
      </ThemeProvider>
    </>
  );
}
