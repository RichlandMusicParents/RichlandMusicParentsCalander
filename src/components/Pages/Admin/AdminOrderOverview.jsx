import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import orderReducer from "../../../redux/reducers/order.reducer";

export default function AdminOrderOverview() {
  const userId = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch({ type: "ADMIN_GET_SPECIFIC_USER", payload: userId });
    dispatch({ type: "ADMIN_GET_SPECIFIC_ORDER_ITEMS", payload: userId });
    dispatch({ type: "GET_SPECIFIC_EVENTS", payload: userId });
    dispatch({ type: "ADMIN_GET_SPECIFIC_ORDER", payload: userId });
  }, []);
  const orderUser = useSelector((store) => store.adminReducer.specificUser);
  const orderItems = useSelector(
    (store) => store.adminReducer.specificOrderItems
  );
  const orderEvents = useSelector((store) => store.adminReducer.specificEvents);
  const specificOrder = useSelector(
    (store) => store.adminReducer.specificOrder
  );

  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");

  useEffect(() => {
    specificOrder[0] !== undefined &&
      setUserFirstName(specificOrder[0].first_name);
    specificOrder[0] !== undefined &&
      setUserLastName(specificOrder[0].last_name);
  }, [orderUser]);
  console.log("User ID:", Number(userId.id));
  console.log("Order User:", orderUser);
  console.log("Order Items:", orderItems);
  console.log("Order Events:", orderEvents);
  console.log("Order:", specificOrder);
  return (
    <>
      <container>
        <header className="order-review-header">
          <h1>Review Order</h1>
        </header>
        <section>
          <article>
            <h2>Customer Details</h2>
            <p>
              {userFirstName} {userLastName}
            </p>
          </article>
        </section>
      </container>
    </>
  );
}
