import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import authService from "../services/AuthService";

export default function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    await authService.login(credentials);
    onLogin();
    history.push("/");
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
        <button>Login</button>
      </form>
    </div>
  );
}
