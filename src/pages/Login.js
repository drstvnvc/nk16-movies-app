import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoginError } from "../store/auth/selectors";

import { login } from "../store/auth/slice";

export default function Login() {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const loginError = useSelector(selectLoginError);

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(login(credentials));
  }

  return (
    <div>
      <h2>Login</h2>
      <form
        style={{ display: "flex", flexDirection: "column", width: 300 }}
        onSubmit={handleSubmit}
      >
        <input
          required
          value={credentials.email}
          placeholder="Email"
          onChange={({ target }) =>
            setCredentials({ ...credentials, email: target.value })
          }
        />
        <input
          required
          value={credentials.password}
          placeholder="Password"
          type="password"
          onChange={({ target }) =>
            setCredentials({ ...credentials, password: target.value })
          }
        />
        {loginError && (
          <span style={{ color: "red" }}>Invalid credentials</span>
        )}
        <button>Login</button>
      </form>
    </div>
  );
}
