import { Button, TextField } from "@mui/material";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

export default function AdminAddOrder() {
  const history = useHistory();
  const id = useParams();
  const user = useSelector((store) => store.adminReducer.specificUser);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [uId, setUId] = useState(0);
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

  useEffect(() => {
    dispatch({ type: "ADMIN_GET_SPECIFIC_USER", payload: id });
  }, []);

  useEffect(() => {
    user[0] !== undefined && setUserFirst(user[0].first_name);
    user[0] !== undefined && setUserLast(user[0].last_name);
    user[0] !== undefined && setUId(user[0].id);
  }, [user]);

  function addInfo() {
    const orderObj = {
      first_name: firstName,
      last_name: lastName,
      address: address,
      city: city,
      state: state,
      zip: zip,
      user_id: Number(id.id),
      email: email,
      phone: phone,
      total: total,
      payment_type: paymentType,
      is_payed: isPayed,
      is_delivered: isDelivered,
    };

    // console.log(orderObj);

    dispatch({ type: "ADD_ORDER", payload: orderObj });
    history.push(`/admin-events/${uId}`);
  }

  return (
    <>
      <div className="admin-add-order">
        <header className="admin-add-order-header">
          <h2>
            Add Info for {userFirst} {userLast}'s Order
          </h2>
        </header>
        <div className="admin-add-order-form">
          <TextField
            sx={{
              width: 150,
            }}
            label="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            sx={{
              width: 150,
            }}
            label="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            sx={{
              width: 150,
            }}
            label="Street Address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            sx={{
              width: 150,
            }}
            label="City"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            sx={{
              width: 150,
            }}
            label="State"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <TextField
            sx={{
              width: 150,
            }}
            label="Zip Code"
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
          <TextField
            sx={{
              width: 150,
            }}
            label="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            sx={{
              width: 150,
            }}
            label="Phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Button variant="contained" onClick={addInfo}>
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
