import { useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  // State to manage the error message visibility
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  useEffect(() => {
    // Show the error message for 5 seconds
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>

      <label>Email address:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      {/* <button disabled={isLoading}>Log in</button> */}
      <button className={isLoading ? "btn-disabled" : ""} disabled={isLoading}>
        {isLoading ? "Logging in..." : "Log in"}
      </button>
      {/* Show error message only if showError is true */}
      {showError && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
