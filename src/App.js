import React, { useReducer } from "react";

const INIT_STATE = {
  username: "",
  password: "",
  loggedIn: false,
  error: "",
  loading: false,
};

function loginReducer(state, action) {
  switch (action.type) {
    case "username":
      return { ...state, username: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "loading":
      return { ...state, error: "", loading: true };
    case "error":
      return { ...state, loading: false, error: action.payload };
    case "login":
      return {
        ...state,
        error: "",
        password: "",
        loading: false,
        loggedIn: true,
      };
    case "logout":
      return { ...state, loggedIn: false };
  }
}

export default function App() {
  const [state, dispatch] = useReducer(loginReducer, INIT_STATE);
  const { username, password, loggedIn, error, loading } = state;

  async function login(e) {
    e.preventDefault();
    dispatch({ type: "loading" });
    await new Promise((r) => setTimeout(r, 1000));
    if (username == "user" && password == "pass") {
      dispatch({ type: "login" });
    } else {
      dispatch({ type: "error", payload: "invalid username or password" });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
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
        onChange={(e) =>
          dispatch({ type: "username", payload: e.target.value })
        }
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) =>
          dispatch({ type: "password", payload: e.target.value })
        }
      />
      <p style={{ color: "red" }}>{error}</p>
      <button disabled={loading}>Login</button>
    </form>
  );
}
