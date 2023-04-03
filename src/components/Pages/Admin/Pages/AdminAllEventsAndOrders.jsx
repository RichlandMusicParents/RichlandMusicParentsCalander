import AdminEventsListComponent from "../Components/AdminEventsListComponent";
import AdminNav from "../Components/AdminNav/AdminNav";
import AdminOrderListComponent from "../Components/AdminOrderListComponent";

export default function AdminAllEventsAndOrders() {
  return (
    <>
      <AdminNav />
      <container className="admin-home-event-list-container">
        <AdminEventsListComponent />
      </container>
      <section className="admin-order-list-section">
        <AdminOrderListComponent />
      </section>
    </>
  );
}
