import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// this function will be a way for the costumer to to review
// what they ordered.



export default function Invoice(){
    const user= useSelector((store) => store.user)
    const events= useSelector((store) => store.eventReducer)
    const orders= useSelector((store) => store.order)    
    return (
        <>
        <h1> Contact information</h1>
        <div className="contactInfo">
        {orders.map((order) => (
    <section key={order.id}>
      
        <h2>Name:{order.first_name}{order.last_name}</h2>
       <h2>Address:{order.address} </h2> 
       <h2> Phone:{order.phone} </h2>
        <h2>Email:{order.email} </h2>
       </section>))}

        </div>
   
       <div className="orderDetails">
       {events.map((events) => (
    <section key={events.id}>
        <table>
            
            <tr>
                <th>Date</th>
                <th>Event Type</th>
                <th>Name</th>
            </tr>
            <tr>
                {/* <td>{events.event_date.$d}</td> */}
                <td>{events.event_type}</td>
                <td>{events.event_name}</td>
            </tr>
        </table>
    
       </section>))}


       </div>
       
       <div className="eventTable">
        <h1>Order Information</h1>
       {orders.map((orderInfo) => (
    <section key={orderInfo.id}>
      
        <h2>Address: {orderInfo.address}</h2>
       <h2>City:{orderInfo.city} </h2> 
       <h2> State:{orderInfo.state} </h2>
        <h2>ZipCode:{orderInfo.zip} </h2>
        <h2>Is it Delivered?:{orderInfo.isDelivered} </h2>
        <h2>is it Payed?:{orderInfo.isPayed} </h2>
        <h2>payment Type:{orderInfo.payment} </h2>
        <h2>Total:{orderInfo.total} </h2>
       </section>))}
        

        

       </div>
     </>)

}
