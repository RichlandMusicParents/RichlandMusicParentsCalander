import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import "../Admin/Admin.css";

export default function AdminEvents() {
  const events = useSelector((store) => store.adminReducer.allEvents);

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "GET_ALL_EVENTS" });
    dispatch({ type: "ADMIN_GET_ALL_ORDERS" });
  }, [dispatch]);
  console.log(events);
  console.log(user);

  return (
    <>
      <div className="events-container">
        <div className="events-header">
          <h2>Created Events</h2>
        </div>
        <div className="events-body">
          <header className="events-body-header">
            <ul className="events-list-header">
              <li className="events-list-title">Event Type</li>
              <li className="events-list-title">Event Name</li>
              <li className="events-list-title">Event Date</li>
              <li className="events-list-title">Created By</li>
            </ul>
          </header>
          <div className="events-body-list">
            {events.map((event) => (
              <>
                <ul className="events-list-body">
                  <li className="events-list-item">{event.event_type}</li>
                  <li className="events-list-item">{event.event_name}</li>
                  <li className="events-list-item">
                    {format(new Date(event.event_date), "MM/dd/yy")}
                  </li>
                  <li className="events-list-item">
                    {event.first_name} {event.last_name}
                  </li>
                </ul>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
