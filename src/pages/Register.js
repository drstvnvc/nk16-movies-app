import React, { useState } from "react";
import { useDispatch } from "react-redux";

import authService from "../services/AuthService";
import { setActiveUser, setToken } from "../store/auth/slice";

export default function Register() {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const data = await authService.register(userData);
    dispatch(setToken(data.token));
    dispatch(setActiveUser(data.user));
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
