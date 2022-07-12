import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { register } from "../store/auth/slice";
import { selectRegistrationErrors } from "../store/auth/selectors";

export default function Register() {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const errors = useSelector(selectRegistrationErrors);

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(register(userData));
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
        {errors?.email?.length && (
          <span style={{ color: "red" }}>{errors.email[0]}</span>
        )}
        <input
          required
          value={userData.password}
          placeholder="Password"
          type="password"
          onChange={({ target }) =>
            setUserData({ ...userData, password: target.value })
          }
        />
        {errors?.password?.length && (
          <span style={{ color: "red" }}>{errors.password[0]}</span>
        )}

        <input
          required
          value={userData.name}
          placeholder="Name"
          onChange={({ target }) =>
            setUserData({ ...userData, name: target.value })
          }
        />
        {errors?.name?.length && (
          <span style={{ color: "red" }}>{errors.name[0]}</span>
        )}
        <button>Register</button>
      </form>
    </div>
  );
}
