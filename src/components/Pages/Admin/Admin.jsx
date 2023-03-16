import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";

export default function Admin() {
  const events = useSelector((store) => store.adminReducer.allEvents);
  const orders = useSelector((store) => store.adminReducer.allOrders);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "GET_ALL_EVENTS" });
    dispatch({ type: "GET_ALL_ORDERS" });
  }, [dispatch]);
  console.log(events);
  console.log(orders);
  console.log(user);
  return (
    <>
      <h1>Hello, {user.first_name}</h1>
      <div className="events">
        <h2>All Created Events</h2>
        <div className="events-container">
          {events.map((item) => {
            return (
              <ul className="event-item" key={item.id}>
                <li>{item.event_type}</li>
                <li>{format(new Date(item.event_date), "MM/dd/yy")}</li>
                <li>{item.event_name}</li>
              </ul>
            );
          })}
        </div>
      </div>
      <div className="orders">
        <h2>All Created Orders</h2>
        <div className="orders-container">
          {orders.map((item) => {
            return (
              <ul className="order-item" key={item.id}>
                <li>
                  <span>First Name</span>
                  {item.first_name}
                </li>
                <li>
                  <span>Last Name</span>
                  {item.last_name}
                </li>
                <li>
                  <span>Street Address</span>
                  {item.address}
                </li>
                <li>
                  <span>City</span>
                  {item.city}
                </li>

                {item.is_delivered ? (
                  <li>
                    <span>Delivered?</span>Yes
                  </li>
                ) : (
                  <li>
                    <span>Delivered?</span>No
                  </li>
                )}
                {item.is_payed ? (
                  <li>
                    <span>Payed?</span>Yes
                  </li>
                ) : (
                  <li>
                    <span>Payed?</span>No
                  </li>
                )}
              </ul>
            );
          })}
        </div>
      </div>
    </>
  );
}
