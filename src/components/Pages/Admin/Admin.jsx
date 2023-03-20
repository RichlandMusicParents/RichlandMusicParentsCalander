import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Admin/Admin.css";
import AdminAddEvents from "./AdminAddEvents";
import AdminEvents from "./AdminEditEvents";

export default function Admin() {
  const events = useSelector((store) => store.adminReducer.allEvents);
  const orders = useSelector((store) => store.adminReducer.allOrders);
  const user = useSelector((store) => store.user);
  // const orderItems = [];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "GET_ALL_EVENTS" });
    dispatch({ type: "ADMIN_GET_ALL_ORDERS" });
  }, [dispatch]);
  console.log(events);
  console.log("orders:", orders);
  console.log(user);

  // console.log(orders.order_items);

  return (
    <>
      <h1>Hello, {user.first_name}</h1>
      <AdminEvents />
      <AdminAddEvents />
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
              <p>Events: {order.order_events.length}</p>
              <p>Total ${order.total}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
