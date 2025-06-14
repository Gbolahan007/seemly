import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import { useLogin } from "../../authentication/useLogin";
import { useSignup } from "../../authentication/useSignup";
import { BiLoaderAlt } from "react-icons/bi";
import toast from "react-hot-toast";
import { useForgotPassword } from "../../authentication/useForgotPassword";
import { useNavigate } from "react-router-dom";

const SignInSignUp = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(false);
  const { session, signOut, signInWithGoogle } = useAuth();
  const { login, isLoading } = useLogin();
  const { signup, isLoading: isSignupLoading } = useSignup();
  const { sendPasswordResetEmail, isLoadingUpdatePassword } =
    useForgotPassword();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    if (forgotPassword && data.email) {
      // Handle password reset request
      sendPasswordResetEmail(data.email);
      console.log("Password reset requested for:", data.email);
      toast.success("Password reset link has been sent to your email.");
      navigate("/update-password");
      setForgotPassword(false);
      reset();
      return;
    }

    if (!data.email || !data.password) return;

    if (isSignIn) {
      login(
        { email: data.email, password: data.password },
        { onSettled: () => reset() },
      );
    } else {
      signup(
        {
          fullName: data.fullName,
          email: data.email,
          password: data.password,
        },
        { onSettled: () => reset() },
      );
    }
  };

  const handleGoogleAuth = async () => {
    const { error } = await signInWithGoogle();
    if (error) console.error("Google authentication error:", error);
  };

  // If user is already logged in
  if (session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 text-center shadow-lg">
          <h1 className="text-2xl font-bold">You are logged in!</h1>
          <p>Welcome, {session.user.email}</p>
          <button
            onClick={signOut}
            className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  // Forgot Password View
  if (forgotPassword) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Reset Password</h1>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                disabled={isLoading}
                placeholder="Enter your email"
                className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoadingUpdatePassword}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              {isLoadingUpdatePassword ? (
                <BiLoaderAlt className="h-5 w-5 animate-spin" />
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>

          <div className="text-center text-sm">
            <button
              onClick={() => setForgotPassword(false)}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Sign In / Sign Up View
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            {isSignIn ? "Sign In" : "Create Account"}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {isSignIn
              ? "Welcome back! Please enter your details"
              : "Start your journey with us today"}
          </p>
        </div>

        <button
          onClick={handleGoogleAuth}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span>
            {isSignIn ? "Sign in with Google" : "Sign up with Google"}
          </span>
        </button>

        <div className="flex items-center justify-center">
          <div className="h-px w-full bg-gray-300" />
          <div className="px-4 text-sm text-gray-500">OR</div>
          <div className="h-px w-full bg-gray-300" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {!isSignIn && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                disabled={isSignupLoading}
                placeholder="Enter your full name"
                className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                }`}
                {...register("fullName", {
                  required: !isSignIn && "Full name is required",
                })}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.fullName.message}
                </p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              disabled={isLoading || isSignupLoading}
              placeholder="Enter your email"
              className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              disabled={isLoading || isSignupLoading}
              placeholder="Enter your password"
              className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {isSignIn && (
            <div className="flex justify-end text-sm">
              <button
                type="button"
                onClick={() => setForgotPassword(true)}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || isSignupLoading}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            {isLoading || isSignupLoading ? (
              <BiLoaderAlt className="h-5 w-5 animate-spin" />
            ) : isSignIn ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="text-center text-sm">
          <span>
            {isSignIn ? "Don’t have an account? " : "Already have an account? "}
          </span>
          <button
            onClick={() => {
              setIsSignIn(!isSignIn);
              reset();
            }}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            {isSignIn ? "Sign up" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInSignUp;
