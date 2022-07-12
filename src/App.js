import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import AddMovie from "./pages/AddMovie";
import AppMovies from "./pages/AppMovies";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SingleMovie from "./pages/SingleMovie";
import authService from "./services/AuthService";
import Counter from "./pages/Counter";
import { selectCounterValue } from "./store/counter/selectors";
import { useDispatch, useSelector } from "react-redux";
import { logout, setActiveUser } from "./store/auth/slice";
import {
  selectActiveUser,
  selectIsAuthenticated,
} from "./store/auth/selectors";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const activeUser = useSelector(selectActiveUser);
  const counter = useSelector(selectCounterValue);

  async function handleLogout() {
    try {
      await authService.logout();
    } catch {
    } finally {
      dispatch(logout());
    }
  }

  useEffect(() => {
    async function loadActiveUser() {
      const activeUser = await authService.getActiveUser();
      dispatch(setActiveUser(activeUser));
    }

    if (isAuthenticated) {
      loadActiveUser();
    }
  }, []);
  return (
    <div className="App">
      <Router>
        <nav>
          <ul>
            <li>Counter: {counter}</li>
            <li>
              <Link to="/movies">Movies</Link>
            </li>
            <li>
              <Link to="/add-movie">Add movie</Link>
            </li>
            {!isAuthenticated && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
            {!isAuthenticated && (
              <li>
                <Link to="/register">Register</Link>
              </li>
            )}
            {isAuthenticated && (
              <li>
                <button onClick={handleLogout}>
                  {activeUser?.name} logout
                </button>
              </li>
            )}
          </ul>
        </nav>
        <Switch>
          <PrivateRoute exact path="/counter">
            <Counter />
          </PrivateRoute>
          <PrivateRoute exact path="/movies">
            <AppMovies />
          </PrivateRoute>
          <PrivateRoute exact path="/movies/:id">
            <SingleMovie />
          </PrivateRoute>
          <PrivateRoute exact path="/add-movie">
            <AddMovie />
          </PrivateRoute>
          <PrivateRoute exact path="/edit/:id">
            <AddMovie />
          </PrivateRoute>
          <PrivateRoute exact path="/">
            <Redirect to="/movies" />
          </PrivateRoute>
          <PublicRoute exact path="/login">
            <Login />
          </PublicRoute>
          <PublicRoute exact path="/register">
            <Register />
          </PublicRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
