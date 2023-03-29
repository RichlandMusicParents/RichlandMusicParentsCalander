import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Nav from "./Shared/Nav/Nav";
import Footer from "./Shared/Footer/Footer";

import ProtectedRoute from "./Shared/ProtectedRoute/ProtectedRoute";

import AboutPage from "./Pages/AboutPage/AboutPage";
import UserPage from "./Pages/UserPage/UserPage";
import InfoPage from "./Pages/InfoPage/InfoPage";
import LandingPage from "./Pages/LandingPage/LandingPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import SplashPage from "./Pages/SplashPage/splashPage";
import Invoice from "./Pages/CustomerInvoice/invoice";
import Events from "./Pages/events/events";
import Notification from "./Pages/Notification/Notification";
//import EventForm from "./UserForm/EventForm";

import "./App.css";
import UserForm from "./UserForm/UserForm";

import OrderCompleted from "./Pages/CustomerInvoice/orderComplete";
import Admin from "./Pages/Admin/Pages/AdminHome";
import AdminOrderFrom from "./Pages/Admin/Pages/AdminOrderForm";
import AdminAddEvents from "./Pages/Admin/Pages/AdminAddEventsAndItems";
import AdminOrderOverview from "./Pages/Admin/Pages/AdminOrderOverview";
import { AdminRegisterUser } from "./Pages/Admin/Pages/AdminRegisterUser";
import { AdminEditUser } from "./Pages/Admin/Pages/AdminEditUser";
import AdminAddOrder from "./Pages/Admin/Pages/AdminAddOrder";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  console.log(user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/splashPage" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/userform" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/userform" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          <Route exact path="/home">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the Landing page
              <LandingPage />
            )}
          </Route>

          {/* This is the page User sees upon visiting LocalHost 3000 Page */}
          <Route exact path="/splashPage">
            <SplashPage />
          </Route>

          <ProtectedRoute path="/userform">
            <UserForm />
            </ProtectedRoute>

          <ProtectedRoute path="/events">
            <Events />
            </ProtectedRoute>

          {/* This is the final final page the user sees that thanks them for ordering and to view their orders. */}
          <ProtectedRoute path="/Complete">
            <OrderCompleted />
            </ProtectedRoute>

          <Route exact path="/admin-home">
            {user.is_admin ? (
              <Admin />
            ) : (
              <Route>
                <h1>403</h1>
                <h2>
                  You do not have access to this page. Please sign in as an
                  admin to view.
                </h2>
              </Route>
            )}
          </Route>

          <Route exact path="/admin-order-form/:id">
            {user.is_admin ? (
              <AdminAddOrder />
            ) : (
              <Route>
                <h1>403</h1>
                <h2>
                  You do not have access to this page. Please sign in as an
                  admin to view.
                </h2>
              </Route>
            )}
          </Route>

          <Route exact path="/admin-events/:id">
            {user.is_admin ? (
              <AdminAddEvents />
            ) : (
              <Route>
                <h1>403</h1>
                <h2>
                  You do not have access to this page. Please sign in as an
                  admin to view.
                </h2>
              </Route>
            )}
          </Route>

          <Route exact path="/admin-order-review/:id">
            {user.is_admin ? (
              <AdminOrderOverview />
            ) : (
              <Route>
                <h1>403</h1>
                <h2>
                  You do not have access to this page. Please sign in as an
                  admin to view.
                </h2>
              </Route>
            )}
          </Route>

          <Route exact path="/admin-register">
            {user.is_admin ? (
              <AdminRegisterUser />
            ) : (
              <Route>
                <h1>403</h1>
                <h2>
                  You do not have access to this page. Please sign in as an
                  admin to view.
                </h2>
              </Route>
            )}
          </Route>

          <Route exact path="/admin-edit-user/:id">
            {user.is_admin ? (
              <AdminEditUser />
            ) : (
              <Route>
                <h1>403</h1>
                <h2>
                  You do not have access to this page. Please sign in as an
                  admin to view.
                </h2>
              </Route>
            )}
          </Route>

          <Route exact path="/customerInvoice">
            <Invoice />
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
