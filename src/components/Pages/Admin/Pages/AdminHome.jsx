import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "../Admin.css";
import AdminEventsListComponent from "../Components/AdminEventsListComponent";
import AdminOrderListComponent from "../Components/AdminOrderListComponent";
import AdminSelectUserComponent from "../Components/AdminSelectUser";

export default function Admin() {
  const history = useHistory();
  const user = useSelector((store) => store.user);

  return (
    <>
      <header className="admin-home-header">
        <h1>Hello, {user.first_name}</h1>
        <section className="admin-search-user">
          <AdminSelectUserComponent />
        </section>
      </header>
      <container className="admin-home-event-list-container">
        <AdminEventsListComponent />
      </container>
      <AdminOrderListComponent />
    </>
  );
}
