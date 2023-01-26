import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../store/session";
import "./LoginForm.css";

const LoginFormPage = () => {
  const [username, setUsername] = useState("haha");
  const [password, setPassword] = useState("asdfasdf");
  const [serverErrors, setServerErrors] = useState([]);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    setServerErrors([]);
    console.log("in form. credential", username);
    if (username === "" || password === "") {
      console.log("yoo");
      return;
    }
    dispatch(login({ credential: username, password: password }))
      .then((res) => res.json())
      .then((data) => {
        console.log(data.errors, "this is login errors (if any)");
        setServerErrors(data.errors);
      });
  };

  return (
    <div>
      <Link to="/">Go back b</Link>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button>Sign In</button>
      </form>
      {serverErrors.map((err, i) => (
        <div style={{ color: "red" }} key={i}>
          {err}
        </div>
      ))}
    </div>
  );
};

export default LoginFormPage;
