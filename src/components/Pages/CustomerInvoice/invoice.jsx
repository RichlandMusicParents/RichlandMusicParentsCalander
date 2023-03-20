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
        {orders.map((order) => (
    <div key={order.id}>
      
        <h2>Name:{order.first_name}{order.last_name}</h2>
       <h2>Address:{order.address} </h2> 
       <h2> Phone:{order.phone} </h2>
        <h2>Email:{order.email} </h2>
       </div>))}
     </>)

}
