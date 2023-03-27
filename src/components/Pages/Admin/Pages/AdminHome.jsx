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

  function sendToRegister() {
    history.push("/admin-register");
  }

  return (
    <>
      <h1>Hello, {user.first_name}</h1>
      <AdminEventsListComponent />
      <AdminSelectUserComponent />
      <Button
        onClick={sendToRegister}
        sx={{ height: 50, margin: 1 }}
        variant="contained"
      >
        Create New User
      </Button>
      <AdminOrderListComponent />
    </>
  );
}
