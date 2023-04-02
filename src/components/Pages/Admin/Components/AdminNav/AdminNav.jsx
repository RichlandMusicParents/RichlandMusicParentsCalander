import { useHistory } from "react-router-dom";

export default function AdminNav() {
  const history = useHistory();
  function sendToHome() {
    history.push("/admin-home");
  }

  function sendToEventsAndOrders() {
    history.push("/admin-orders-and-events");
  }

  function sendToSearchUser() {
    history.push("/admin-search-user");
  }
  return (
    <>
      <div className="admin-nav">
        <nav>
          <p onClick={sendToHome}>Home</p>
          <p onClick={sendToEventsAndOrders}>Events & Orders</p>
          <p onClick={sendToSearchUser}>User Look Up</p>
        </nav>
      </div>
    </>
  );
}
