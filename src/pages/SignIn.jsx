import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Input from "../components/Input";
import Button from "../components/Button";
import AuthFooter from "../components/AuthFooter";
import { useLogin } from "../hooks/useAuth";

export default function SignIn() {
  const navigate = useNavigate();
  const { token } = useAuthStore();

  useEffect(() => {
    if (token) navigate("/dashboard");
  }, [token, navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { mutate: login, isPending } = useLogin();

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      newErrors.email = "Please enter a valid email.";

    if (!password.trim()) newErrors.password = "Password is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitSignIn = (e) => {
    e.preventDefault();
    if (!validate()) return;

    login({
      email,
      password,
    });
  };

  return (
    <div className="flex min-h-screen">
      <div className="absolute top-10 left-34">
        <img src="/Logo.png" alt="Maglo Logo" className="w-30 h-7" />
      </div>

      <div className="w-1/2 flex items-center justify-center p-12">
        <div className="absolute left-34 top-1/2 -translate-y-1/2 w-101 flex flex-col items-start gap-6">
          <div className="w-full">
            <h1 className="text-3xl font-semibold mb-2">Sign In</h1>
            <p className="text-gray-400 mb-2">
              Welcome back! Please enter your details
            </p>
          </div>

          <form onSubmit={submitSignIn} className="w-full space-y-3">
            <Input
              label="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              error={errors.email}
              disabled={isPending}
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="•••••••••"
              error={errors.password}
              disabled={isPending}
            />

            <Button type="submit" variant="primary" loading={isPending}>
              {isPending ? "Signing in..." : "Sign In"}
            </Button>

            <Button
              type="button"
              variant="secondary"
              disabled={isPending}
              icon="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            >
              Sign in with google
            </Button>
          </form>

          <AuthFooter
            text="Don't have an account?"
            linkText="Sign up"
            linkTo="/signup"
          />
        </div>
      </div>

      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <img
          src="/maglo.png"
          alt="Maglo Illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
