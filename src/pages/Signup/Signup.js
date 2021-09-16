import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth-context";
import { useToast } from "../../context/toast-context";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isEmail, isStrongPassword } from "validator";
import { ErrorMessage } from "../../components";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpStatus, setSignUpSatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [validationError, setValidationError] = useState({
    email: "",
    password: "",
  });

  const { signUpUser, isLoggedIn } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { dispatch: toastDispatch } = useToast();

  //eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => isLoggedIn && navigate("/"), [isLoggedIn]);

  const validateEmail = () => {
    setValidationError((validationError) => ({
      ...validationError,
      email: "",
    }));

    if (!isEmail(email)) {
      setValidationError((validationError) => ({
        ...validationError,
        email: "Email is invalid",
      }));

      return false;
    }

    return true;
  };

  const validatePassword = () => {
    setValidationError((validationError) => ({
      ...validationError,
      password: "",
    }));

    if (!isStrongPassword(password)) {
      setValidationError((validationError) => ({
        ...validationError,
        password: "Password is not strong enough",
      }));

      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail() && !validatePassword()) {
      return;
    }

    if (password !== confirmPassword) {
      setSignUpSatus("failed");
      setErrorMessage("Passwords don't match");
      return;
    }

    if (password === confirmPassword) {
      const success = await signUpUser({ name, email, password });
      if (success === true) {
        toastDispatch({
          TYPE: "SUCCESS",
          PAYLOAD: { message: "Signup successful! Login to continue." },
        });
        navigate(state?.from ? state.from : "/");
      }
    }
  };
  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2 className="form-title">Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-subtitle">Name</div>
          <input
            value={name}
            className="input"
            type="text"
            placeholder="John Doe"
            onChange={(e) => setName(e.target.value)}
          />
          <div className="form-subtitle">Email</div>
          <input
            value={email}
            className="input"
            type="email"
            placeholder="johndoe@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          {validationError.email && (
            <ErrorMessage errorMessage={validationError.email} />
          )}
          <div className="form-subtitle">Password</div>
          <input
            value={password}
            type="password"
            className="input"
            placeholder="••••••"
            onChange={(e) => setPassword(e.target.value)}
          />
          {validationError.password && (
            <ErrorMessage errorMessage={validationError.password} />
          )}
          <div className="form-subtitle">Confirm Password</div>
          <input
            value={confirmPassword}
            type="password"
            className="input"
            placeholder="*******"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {signUpStatus === "failed" && (
            <div className="alert error">
              <svg width="20px" height="20px" viewBox="0 0 24 24">
                <path d="M13 13h-2V7h2m0 10h-2v-2h2M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2z"></path>
              </svg>
              {errorMessage}
            </div>
          )}
          <button type="submit" className="btn btn-lg btn-primary">
            Sign Up
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <Link to="/login">
            <span className="signup-link">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
