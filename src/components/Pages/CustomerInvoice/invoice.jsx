import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
} from "@mui/material";
import { useDispatch } from "react-redux";



export default function Invoice() {
    const user = useSelector((store) => store.user);
    const events = useSelector((store) => store.eventReducer);
    const orders = useSelector((store) => store.order);
    const dispatch= useDispatch();
    
    useEffect(() => {
      dispatch({ type: "GET_USER_EVENT" });
    }, []);


  //Function to delete a event row.
  function deleteUserEvent(id){
    dispatch({type: "USER_DELETE_EVENT", payload: id})
   
  }

  return (
    <>
      <h1>Contact information</h1>
      <div className="contactInfo">
        {orders.map((order) => (
          <section key={order.id}>
            <h2>
              Name: {order.first_name} {order.last_name}
            </h2>
            <h2>Address: {order.address}</h2>
            <h2>Phone: {order.phone}</h2>
            <h2>Email: {order.email}</h2>
          </section>
        ))}
      </div>

      <div className="orderDetails">
        <h1>Event Details</h1>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Event Type</TableCell>
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{event.event_date}</TableCell>
                  <TableCell>{event.event_type}</TableCell>
                  <TableCell>{event.event_name}</TableCell>
                  <TableCell><Button onClick={() => deleteUserEvent(event.id)}
                  >Delete</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="eventTable">
        <h1>Order Information</h1>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Address</TableCell>
                <TableCell>City</TableCell>
                <TableCell>State</TableCell>
                <TableCell>ZipCode</TableCell>
                {/* <TableCell>Is it Delivered?</TableCell>
                <TableCell>Is it Payed?</TableCell> */}
                <TableCell>Payment Type</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((orderInfo) => (
                <TableRow key={orderInfo.id}>
                  <TableCell>{orderInfo.address}</TableCell>
                  <TableCell>{orderInfo.city}</TableCell>
                  <TableCell>{orderInfo.state}</TableCell>
                  <TableCell>{orderInfo.zip}</TableCell>
                  {/* <TableCell>{orderInfo.isDelivered}</TableCell>
                  <TableCell>{orderInfo.isPayed}</TableCell> */}
                  <TableCell>{orderInfo.payment_type}</TableCell>
                  <TableCell>{orderInfo.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
