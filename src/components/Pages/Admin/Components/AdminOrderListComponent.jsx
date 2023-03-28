import { Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AdminOrderListComponent() {
  useEffect(() => {
    dispatch({ type: "ADMIN_GET_ALL_ORDERS" });
  }, [dispatch]);
  const dispatch = useDispatch();
  const orders = useSelector((store) => store.adminReducer.allOrders);
  function editOrder(id, user_id) {
    history.push(`/admin-order-review/${user_id}`);
  }
  return (
    <>
      <div className="section">
        <header className="orders-header">
          <h2>All Created Orders</h2>
        </header>
        <div className="orders">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <h2>Order Number: {order.id}</h2>
              <Button onClick={() => editOrder(order.id, order.user_id)}>
                Edit
              </Button>
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
