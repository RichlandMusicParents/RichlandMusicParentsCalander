import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Admin/Admin.css";
import AdminAddEvents from "./AdminAddEvents";
import AdminEvents from "./AdminEditEvents";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";

export default function Admin() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "GET_ALL_EVENTS" });
    dispatch({ type: "ADMIN_GET_ALL_ORDERS" });
    dispatch({ type: "ADMIN_GET_ALL_USERS" });
  }, [dispatch]);
  const orders = useSelector((store) => store.adminReducer.allOrders);
  const user = useSelector((store) => store.user);
  const users = useSelector((store) => store.adminReducer.allUsers);
  const [userId, setUserId] = useState(users[0]);
  const [userIdInput, setUserIdInput] = useState("");

  console.log("Orders:", orders);
  console.log("User", userId);

  function sendToForm() {
    history.push(`/admin-order-form/${userId.id}`);
  }

  // console.log(orders.order_items);

  return (
    <>
      <h1>Hello, {user.first_name}</h1>
      <AdminEvents />
      <h2>Create New Order For:</h2>
      <Autocomplete
        sx={{
          width: 150,
        }}
        value={userId}
        onChange={(event, newValue) => setUserId(newValue)}
        inputValue={userIdInput}
        onInputChange={(event, newInputValue) => setUserIdInput(newInputValue)}
        id="user-list-lookup"
        getOptionLabel={(users) => `${users.first_name} ${users.last_name}`}
        options={users}
        isOptionEqualToValue={(option, value) =>
          option.first_name === value.first_name
        }
        noOptionsText={"No valid User"}
        renderOption={(props, users) => (
          <Box component="li" {...props} key={users.id}>
            {users.first_name} {users.last_name}
          </Box>
        )}
        renderInput={(params) => <TextField {...params} label="Linked User" />}
      />
      <Button
        onClick={sendToForm}
        sx={{ height: 50, margin: 1 }}
        variant="contained"
      >
        Create New Order
      </Button>
      <div className="section">
        <header className="orders-header">
          <h2>All Created Orders</h2>
        </header>
        <div className="orders">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <h2>Order Number: {order.id}</h2>
              <div className="order-card-header">
                <p>
                  {order.first_name} {order.last_name}
                </p>
                <div className="address">
                  <p>{order.address}</p>
                  <p>
                    {order.city} {order.state}
                  </p>
                  <p>{order.zip}</p>
                  <p>{order.phone}</p>
                </div>
              </div>
              <p>Payment type: {order.payment_type}</p>
              <p>
                Payed For? {order.is_payed ? <span>Yes</span> : <span>No</span>}
              </p>
              <p>
                Delivered?{" "}
                {order.is_delivered ? <span>Yes</span> : <span>No</span>}
              </p>
              {/* <p>Calendars: {order.order_items[0].quantity}</p>s */}
              {/* <p>Extra Events: {order.order_items}</p> */}
              {/* <p>Events: {order.order_events.length}</p> */}
              <p>Total ${order.total}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
