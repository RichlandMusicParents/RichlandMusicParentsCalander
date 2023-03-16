import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// this function will be a way for the costumer to to review
// what they ordered.
export default function Invoice(){
    
    return (
        <>
        <div>
             <h1>Richland Music Parents</h1>
        <h2>Invoice Details</h2>
        {/* Grab customer and order info from the store, then map over it to grab data out of it. */}
        <p>Name:</p>
        <p>Address:</p>
        <p>City:</p>
        <p>State:</p>
        <p>ZipCode:</p>
        </div>
        <div>
            <table>
                <tr>
                     <th>QTY</th>
                    <th>Description</th>
                    <th>Price</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Calendar</td>
                    <td>$15.00</td>
                </tr>
            </table>
            <h3>Total:</h3>
            <h3>Payment type:</h3>
            <button>Order Now!</button>

        </div>
       
        </>
    )

}