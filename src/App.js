import React, { useState } from "react";

const INIT_STATE = {
  username: "",
  password: "",
  loggedIn: false,
  error: "",
  loading: false,
};

export default function App() {
  const [state, setState] = useState(INIT_STATE);
  const { username, password, loggedIn, error, loading } = state;

  async function login(e) {
    e.preventDefault();
    setState({ ...state, error: "", loading: true });
    await new Promise((r) => setTimeout(r, 1000));
    if (username == "user" && password == "pass") {
      setState((state) => ({ ...state, password: "", loggedIn: true }));
    } else {
      setState((state) => ({
        ...state,
        error: "invalid username or password",
      }));
    }

    setState((state) => ({ ...state, loading: false }));
  }

  function logout() {
    setState({ ...state, loggedIn: false });
  }

  return loggedIn ? (
    <div>
      <p>welcome {username}</p>
      <button onClick={logout}>Logout</button>
    </div>
  ) : (
    <form onSubmit={login}>
      <input
        placeholder="username"
        value={username}
        onChange={(e) => setState({ ...state, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setState({ ...state, password: e.target.value })}
      />
      <p style={{ color: "red" }}>{error}</p>
      <button disabled={loading}>Login</button>
    </form>
  );
}
