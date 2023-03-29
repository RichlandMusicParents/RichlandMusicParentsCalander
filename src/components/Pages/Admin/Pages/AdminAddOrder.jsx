import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "../AdminAddOrder.css";

export default function AdminAddOrder() {
  const history = useHistory();
  const userId = useParams();

  useEffect(() => {
    dispatch({ type: "ADMIN_GET_SPECIFIC_USER", payload: userId });
  }, []);
  const user = useSelector((store) => store.adminReducer.specificUser);
  const specificOrder = useSelector(
    (store) => store.adminReducer.specificOrder
  );
  console.log("User ID:", Number(userId.id));
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [paymentType, setPaymentType] = useState("0");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isPayed, setIsPayed] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);
  const [total, setTotal] = useState(0);
  const [userFirst, setUserFirst] = useState("");
  const [userLast, setUserLast] = useState("");
  const dispatch = useDispatch();

  function addInfo() {
    const orderObj = {
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

    dispatch({ type: "ADMIN_ADD_ORDER", payload: orderObj });
    // console.log(orderObj);
    history.push(`/admin-events/${userId.id}`);
  }

  useEffect(() => {
    user[0] !== undefined && setUserFirst(user[0].first_name);
    user[0] !== undefined && setUserLast(user[0].last_name);
  }, [user]);

  return (
    <>
      <div className="admin-add-order">
        <form className="admin-add-order-form">
          <header className="admin-add-order-header">
            <h2>
              Info for {userFirst} {userLast}'s Order
            </h2>
          </header>
          <TextField
            sx={{
              marginTop: 5,
              width: 300,
              margin: 1,
            }}
            label="First Name"
            placeholder="Eg. John"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            sx={{
              width: 300,
              margin: 1,
            }}
            label="Last Name"
            placeholder="Eg. Appleseed"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            sx={{
              width: 300,
              margin: 1,
            }}
            label="Street Address"
            placeholder="Eg. 123 Main St S"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            sx={{
              width: 300,
              margin: 1,
            }}
            label="City"
            placeholder="Eg. Fargo"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            sx={{
              width: 300,
              margin: 1,
            }}
            label="State"
            placeholder="Eg. ND"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <TextField
            sx={{
              margin: 1,
              width: 300,
            }}
            label="Zip Code"
            placeholder="Eg. 58123"
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
          <TextField
            sx={{
              width: 300,
              margin: 1,
            }}
            label="Email"
            placeholder="Eg. user@email.com"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            sx={{
              width: 300,
              margin: 1,
            }}
            label="Phone"
            placeholder="Eg. 1234567890"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Button
            sx={{
              width: 300,
              height: 50,
              margin: 1,
              marginBottom: 5,
            }}
            variant="contained"
            onClick={addInfo}
          >
            Next
          </Button>
        </form>
      </div>
    </>
  );
}
