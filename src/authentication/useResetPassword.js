import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updatePassword } from "../services/apiAuth";

export function useResetPassword() {
  const { mutate: resetPassword, isLoading } = useMutation({
    mutationFn: ({ token, password }) => updatePassword(password),
    onSuccess: () => {
      toast.success("Password successfully reset.");
    },
    onError: () => {
      toast.error("Failed to reset password. Please try again.");
    },
  });

  return { resetPassword, isLoading };
}
