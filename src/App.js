import React, { useState } from "react";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    if (username == "user" && password == "pass") {
      setPassword("");
      setLoggedIn(true);
    } else {
      setError("invalid username or password");
    }
    setLoading(false);
  }

  function logout() {
    setLoggedIn(false);
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
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p style={{ color: "red" }}>{error}</p>
      <button disabled={loading}>Login</button>
    </form>
  );
}
