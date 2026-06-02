import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const login = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      navigate("/dashboard");

    } catch (err) {

      setError(
        "Invalid email or password."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">

      <div className="floating-orb orb1"></div>
      <div className="floating-orb orb2"></div>
      <div className="floating-orb orb3"></div>

      <div className="login-card">

        <div className="logo-area">
          <h1>REAL STORYVERSE</h1>
          <p>Admin Control Center</p>
        </div>

        <form
          onSubmit={login}
          className="login-form"
        >

          <div className="input-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>

          <div className="input-group">

            <label>Password</label>

            <div className="password-box">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                required
              />

              <button
                type="button"
                className="toggle-btn"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </button>

            </div>

          </div>

          {error && (
            <div className="error-box">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading
              ? "Signing In..."
              : "Login to Dashboard"}
          </button>

        </form>

        <div className="bottom-text">
          Real Storyverse Admin Portal
        </div>

      </div>

    </div>
  );
}

