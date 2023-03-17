// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { format } from "date-fns";

// export default function Admin() {
//   const events = useSelector((store) => store.adminReducer.allEvents);
//   const orders = useSelector((store) => store.adminReducer.allOrders);
//   const user = useSelector((store) => store.user);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch({ type: "GET_ALL_EVENTS" });
//     dispatch({ type: "GET_ALL_ORDERS" });
//   }, [dispatch]);
//   console.log(events);
//   console.log(orders);
//   console.log(user);
//   return (
//     <>
//       <h1>Hello, {user.first_name}</h1>
//       <div className="events">
//         <h2>All Created Events</h2>
//         <table className="events-table">
//           <thead>
//             <tr>
//               <th>Event Type</th>
//               <th>Event Date</th>
//               <th>Event Name</th>
//             </tr>
//           </thead>
//           <tbody>
//             {events.map((item) => (
//               <tr>
//                 <td>{item.event_type}</td>
//                 <td>{format(new Date(item.event_date), "MM/dd/yy")}</td>
//                 <td>{item.event_name}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="orders">
//         <h2>All Created Orders</h2>
//         <div className="orders-container">
//           {orders.map((item) => {
//             return (
//               <ul className="order-item" key={item.id}>
//                 <div className="order-category">
//                   <li>First Name</li>
//                   <li>{item.first_name}</li>
//                 </div>
//                 <div className="order-category"></div>
//                 <li>{item.last_name}</li>
//                 <div className="order-category"></div>
//                 <li>{item.address}</li>
//                 <div className="order-category"></div>
//                 <li>{item.city}</li>
//                 {item.is_delivered ? <li>Yes</li> : <li>No</li>}
//                 {item.is_payed ? <li>Yes</li> : <li>No</li>}
//               </ul>
//             );
//           })}
//         </div>
//       </div>
//     </>
//   );
// }
