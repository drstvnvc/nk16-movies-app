import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import AddMovie from "./pages/AddMovie";
import AppMovies from "./pages/AppMovies";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SingleMovie from "./pages/SingleMovie";
import authService from "./services/AuthService";
import store from "./store";
import Counter from "./pages/Counter";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  async function handleLogout() {
    await authService.logout();
    setIsAuthenticated(false);
  }
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <nav>
            <ul>
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
                  <button onClick={handleLogout}>Logout</button>
                </li>
              )}
            </ul>
          </nav>
          <Switch>
            <Route exact path="/counter">
              <Counter />
            </Route>
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
              <Login
                onLogin={() => {
                  setIsAuthenticated(true);
                }}
              />
            </PublicRoute>
            <PublicRoute exact path="/register">
              <Register
                onRegister={() => {
                  setIsAuthenticated(true);
                }}
              />
            </PublicRoute>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
