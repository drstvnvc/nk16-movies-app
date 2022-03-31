import { useState } from "react";
import { useHistory } from "react-router-dom";
import authService from "../services/AuthService";

export default function Register({ onRegister }) {
  const history = useHistory();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    name: "",
  });

  const [invalidCredentials, setInvalidCredentials] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setInvalidCredentials(false);

    try {
      await authService.register(credentials);
      history.push("/");
      onRegister();
    } catch {
      setInvalidCredentials(true);
      alert("invalid credentials");
    }
    console.log("logged in successfully");
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
          value={credentials.name}
          placeholder="Name"
          onChange={({ target }) =>
            setCredentials({ ...credentials, name: target.value })
          }
        />
        <input
          required
          value={credentials.email}
          type="email"
          placeholder="Email"
          onChange={({ target }) =>
            setCredentials({ ...credentials, email: target.value })
          }
        />
        <input
          required
          value={credentials.password}
          type="password"
          placeholder="Password"
          onChange={({ target }) =>
            setCredentials({ ...credentials, password: target.value })
          }
        />
        <input
          required
          value={credentials.password_confirmation}
          type="password"
          placeholder="Confirm password"
          onChange={({ target }) =>
            setCredentials({
              ...credentials,
              password_confirmation: target.value,
            })
          }
        />
        {invalidCredentials && (
          <p style={{ color: "red" }}>Invalid credentials</p>
        )}
        <button>Login</button>
      </form>
    </div>
  );
}
