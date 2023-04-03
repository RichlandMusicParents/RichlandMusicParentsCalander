import { Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";

export default function AdminOrderListComponent() {
  useEffect(() => {
    dispatch({ type: "ADMIN_GET_ALL_ORDERS" });
  }, [dispatch]);
  const dispatch = useDispatch();
  const history = useHistory();
  const orders = useSelector((store) => store.adminReducer.allOrders);
  function editOrder(id, user_id) {
    history.push(`/admin-order-review/${user_id}`);
  }

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
  return (
    <>
      <ThemeProvider theme={richlandTheme}>
        <section>
          <header className="orders-header">
            <h2>All Created Orders</h2>
          </header>
          <div className="orders">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <header className="order-card-header">
                  <h2>
                    Order for: {order.first_name} {order.last_name}
                  </h2>
                </header>
                <div className="order-card-body">
                  <div className="order-card-contact-info">
                    <header className="contact-info-header">
                      <h3>Customer Info</h3>
                    </header>
                    <div className="order-card-info">
                      <p>{order.address}</p>
                      <p>
                        {order.city}, {order.state}
                      </p>
                      <p>{order.zip}</p>
                      <p>{order.phone}</p>
                    </div>
                  </div>
                  <div className="order-card-details">
                    <header className="order-card-details-header">
                      <h3>Order Details</h3>
                    </header>
                    <div className="order-details-info">
                      <p>Payment type: {order.payment_type}</p>
                      <p>
                        Payed For?{" "}
                        {order.is_payed ? <span>Yes</span> : <span>No</span>}
                      </p>
                      <p>
                        Delivered?{" "}
                        {order.is_delivered ? (
                          <span>Yes</span>
                        ) : (
                          <span>No</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="order-card-footer">
                  <p>
                    Total: <span className="bold-total">${order.total}</span>
                  </p>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => editOrder(order.id, order.user_id)}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ThemeProvider>
    </>
  );
}
