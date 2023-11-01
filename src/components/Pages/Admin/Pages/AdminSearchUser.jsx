import { useHistory } from "react-router-dom";
import AdminNav from "../Components/AdminNav/AdminNav";
import AdminSelectUserComponent from "../Components/AdminSelectUser";

export default function AdminSearchUser() {
  return (
    <>
      <AdminNav />
      <AdminSelectUserComponent />
    </>
  );
}
