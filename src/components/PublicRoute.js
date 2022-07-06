import { Redirect, Route } from "react-router-dom";

export default function PublicRoute({ children, ...props }) {
  const isGuest = !localStorage.getItem("token");

  return <Route {...props}>{isGuest ? children : <Redirect to="/" />}</Route>;
}
