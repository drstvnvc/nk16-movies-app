import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import AddMovie from "./pages/AddMovie";
import AppMovies from "./pages/AppMovies";
import SingleMovie from "./pages/SingleMovie";

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/movies">Movies</Link>
            </li>
            <li>
              <Link to="/add-movie">Add movie</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/movies">
            <AppMovies />
          </Route>
          <Route exact path="/movies/:id">
            <SingleMovie />
          </Route>
          <Route exact path="/add-movie">
            <AddMovie />
          </Route>
          <Route exact path="/edit/:id">
            <AddMovie />
          </Route>
          <Route exact path="/">
            <Redirect to="/movies" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
