import {
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "../Admin.css";

export default function ReviewOrderInfo() {
  const userId = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch({ type: "ADMIN_GET_SPECIFIC_USER", payload: userId });
    dispatch({ type: "ADMIN_GET_SPECIFIC_ORDER", payload: userId.id });
  }, []);

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
  const [total, setTotal] = useState(0);
  const [paymentType, setPaymentType] = useState("0");
  const [isPayed, setIsPayed] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);

  useEffect(() => {
    specificOrder[0] !== undefined && setFirstName(specificOrder[0].first_name);
    specificOrder[0] !== undefined && setLastName(specificOrder[0].last_name);
    specificOrder[0] !== undefined && setAddress(specificOrder[0].address);
    specificOrder[0] !== undefined && setCity(specificOrder[0].city);
    specificOrder[0] !== undefined && setZip(specificOrder[0].zip);
    specificOrder[0] !== undefined && setState(specificOrder[0].state);
    specificOrder[0] !== undefined && setEmail(specificOrder[0].email);
    specificOrder[0] !== undefined && setPhone(specificOrder[0].phone);
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
      total: total,
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
      <container>
        <header className="order-review-header">
          <h1>Review Order</h1>
        </header>
        <section>
          <header>
            <h2>Customer Details</h2>
          </header>
          {specificOrder.map((orderInfo) => (
            <article key={orderInfo.id}>
              {orderInfoEditMode ? (
                <>
                  <form className="edit-order-info-form">
                    <TextField
                      sx={{
                        width: 150,
                        marginBlock: 1,
                      }}
                      label="First Name"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                      sx={{
                        width: 150,
                        marginBlock: 1,
                      }}
                      label="Last Name"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <TextField
                      sx={{
                        width: 150,
                        marginBlock: 1,
                      }}
                      label="Street Address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <TextField
                      sx={{
                        width: 150,
                        marginBlock: 1,
                      }}
                      label="State"
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                    <TextField
                      sx={{
                        width: 150,
                        marginBlock: 1,
                      }}
                      label="City"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <TextField
                      sx={{
                        width: 150,
                        marginBlock: 1,
                      }}
                      label="Zip"
                      type="text"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                    />
                    <TextField
                      sx={{
                        width: 150,
                        marginBlock: 1,
                      }}
                      label="Email"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                      sx={{
                        width: 150,
                        marginBlock: 1,
                      }}
                      label="Phone"
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <TextField
                      sx={{
                        width: 150,
                        marginBlock: 1,
                      }}
                      label="Phone"
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">
                        Payed?
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={isPayed}
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="Yes"
                          onChange={(e) => setIsPayed(e.target.value)}
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="No"
                          onChange={(e) => setIsPayed(e.target.value)}
                        />
                      </RadioGroup>
                    </FormControl>
                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">
                        Delivered?
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={isDelivered}
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="Yes"
                          onChange={(e) => setIsDelivered(e.target.value)}
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="No"
                          onChange={(e) => setIsDelivered(e.target.value)}
                        />
                      </RadioGroup>
                    </FormControl>
                    <Select
                      sx={{
                        width: 150,
                        marginBlock: 1,
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Payment Method" />
                      )}
                      name="payment_type"
                      id="pType"
                      value={paymentType}
                      onChange={(e) => setPaymentType(e.target.value)}
                    >
                      <MenuItem value="0">Select Payment Type</MenuItem>
                      <MenuItem value="Cash">Cash</MenuItem>
                      <MenuItem value="Check">Check</MenuItem>
                      <MenuItem value="Card">Card</MenuItem>
                    </Select>
                    <Button
                      sx={{
                        width: 150,
                        marginBlock: 1,
                      }}
                      variant="contained"
                      onClick={saveOrderInfo}
                    >
                      Save
                    </Button>
                    <Button
                      sx={{
                        width: 150,
                        marginBlock: 1,
                      }}
                      variant="contained"
                      color="secondary"
                      onClick={() => setOrderInfoEditMode(false)}
                    >
                      Cancel
                    </Button>
                  </form>
                </>
              ) : (
                <>
                  <h3>{orderInfo.first_name}</h3>
                  <h3>{orderInfo.last_name}</h3>
                  <h3>{orderInfo.address}</h3>
                  <h3>{orderInfo.state}</h3>
                  <h3>{orderInfo.city}</h3>
                  <h3>{orderInfo.zip}</h3>
                  <h3>{orderInfo.email}</h3>
                  <h3>{orderInfo.phone}</h3>
                  {orderInfo.is_payed ? (
                    <>
                      <h3>Payed: Yes</h3>
                    </>
                  ) : (
                    <>
                      <h3>Payed: No</h3>
                    </>
                  )}
                  {orderInfo.is_delivered ? (
                    <>
                      <h3>Delivered: Yes</h3>
                    </>
                  ) : (
                    <>
                      <h3>Delivered: No</h3>
                    </>
                  )}
                  <h3>Payment Method: {orderInfo.payment_type}</h3>
                  <Button
                    sx={{
                      width: 100,
                      marginBlock: 1,
                    }}
                    variant="contained"
                    onClick={() => setOrderEditMode(orderInfo.id)}
                  >
                    Edit Info
                  </Button>
                </>
              )}
            </article>
          ))}
        </section>
      </container>
    </>
  );
}
