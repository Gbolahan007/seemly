import { useMutation } from "@tanstack/react-query";
import { updatePassword as updatePasswordApi } from "../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdatePassword() {
  const { mutate: updateUserPassword, isLoading: isUpdatingPassword } =
    useMutation({
      mutationFn: (newPassword) => updatePasswordApi(newPassword),
      onSuccess: () => {
        toast.success("Password successfully updated");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to update password");
      },
    });

  return { updateUserPassword, isUpdatingPassword };
}
