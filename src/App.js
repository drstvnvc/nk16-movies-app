import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import AddMovie from "./pages/AddMovie";
import AppMovies from "./pages/AppMovies";
import Login from "./pages/Login";
import SingleMovie from "./pages/SingleMovie";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register";
import { useState } from "react";
import authService from "./services/AuthService";

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
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/movies">Movies</Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link to="/add-movie">Add movie</Link>
              </li>
            )}
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
                <span onClick={handleLogout}>Logout</span>
              </li>
            )}
          </ul>
        </nav>
        <Switch>
          <Route exact path="/movies">
            <AppMovies />
          </Route>
          <Route exact path="/movies/:id">
            <SingleMovie />
          </Route>
          <PrivateRoute exact path="/add-movie">
            <AddMovie />
          </PrivateRoute>
          <PrivateRoute exact path="/edit/:id">
            <AddMovie />
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
          <Route exact path="/">
            <Redirect to="/movies" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
