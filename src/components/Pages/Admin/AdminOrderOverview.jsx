import { Button, TextField } from "@mui/material";
import { add } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "../Admin/Admin.css";
import ReviewOrderInfo from "./Components/ReviewOrderInfo";

export default function AdminOrderOverview() {
  const userId = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch({ type: "ADMIN_GET_SPECIFIC_USER", payload: userId });
    dispatch({ type: "ADMIN_GET_SPECIFIC_ORDER_ITEMS", payload: userId.id });
    dispatch({ type: "GET_SPECIFIC_EVENTS", payload: userId.id });
    dispatch({ type: "ADMIN_GET_SPECIFIC_ORDER", payload: userId.id });
  }, []);

  const orderUser = useSelector((store) => store.adminReducer.specificUser);
  const orderItems = useSelector(
    (store) => store.adminReducer.specificOrderItems
  );
  const orderEvents = useSelector((store) => store.adminReducer.specificEvents);
  const specificOrder = useSelector(
    (store) => store.adminReducer.specificOrder
  );

  return (
    <>
      <ReviewOrderInfo />
    </>
  );
}
