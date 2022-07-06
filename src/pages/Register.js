import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import authService from "../services/AuthService";

export default function Register({ onRegister }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    await authService.register(userData);
    onRegister();
    history.push("/");
  }

  return (
    <div>
      <h2>Register</h2>
      <form
        style={{ display: "flex", flexDirection: "column", width: 300 }}
        onSubmit={handleSubmit}
      >
        <input
          required
          value={userData.email}
          type="email"
          placeholder="Email"
          onChange={({ target }) =>
            setUserData({ ...userData, email: target.value })
          }
        />
        <input
          required
          value={userData.password}
          placeholder="Password"
          type="password"
          onChange={({ target }) =>
            setUserData({ ...userData, password: target.value })
          }
        />
        <input
          required
          value={userData.name}
          placeholder="Name"
          onChange={({ target }) =>
            setUserData({ ...userData, name: target.value })
          }
        />
        <button>Register</button>
      </form>
    </div>
  );
}
