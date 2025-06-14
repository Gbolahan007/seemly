import { useForm } from "react-hook-form";
import { BiLoaderAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useUpdatePassword } from "../authentication/useUpdatePassword";

function UpdatePassword() {
  const navigate = useNavigate();
  const { updateUserPassword, isUpdatingPassword } = useUpdatePassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  function onSubmit(data) {
    if (data.password !== data.passwordConfirm) {
      return; // The validation in register will catch this
    }

    updateUserPassword(data.password, {
      onSuccess: () => {
        navigate("/home"); // Redirect to login page after successful password update
      },
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Reset Your Password</h1>
          <p className="mt-2 text-sm text-gray-600">
            Please enter your new password
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              disabled={isUpdatingPassword}
              placeholder="Enter new password"
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

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              disabled={isUpdatingPassword}
              placeholder="Confirm new password"
              className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.passwordConfirm ? "border-red-500" : "border-gray-300"
              }`}
              {...register("passwordConfirm", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              })}
            />
            {errors.passwordConfirm && (
              <p className="mt-1 text-sm text-red-600">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isUpdatingPassword}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            {isUpdatingPassword ? (
              <BiLoaderAlt className="h-5 w-5 animate-spin" />
            ) : (
              "Update Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePassword;
