import { useSelector } from "react-redux";
import "../Admin.css";
import AdminEventsListComponent from "../Components/AdminEventsListComponent";
import AdminOrderListComponent from "../Components/AdminOrderListComponent";
import AdminSelectUserComponent from "../Components/AdminSelectUser";

export default function Admin() {
  const user = useSelector((store) => store.user);

  return (
    <>
      <h1>Hello, {user.first_name}</h1>
      <AdminEventsListComponent />
      <AdminSelectUserComponent />
      <AdminOrderListComponent />
    </>
  );
}
