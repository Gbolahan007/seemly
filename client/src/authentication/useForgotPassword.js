import { useMutation } from "@tanstack/react-query";
import { sendPasswordResetEmail as sendResetEmailApi } from "../services/apiAuth";
import toast from "react-hot-toast";

export function useForgotPassword() {
  const { mutate: sendPasswordResetEmail, isLoading: isLoadingUpdatePassword } =
    useMutation({
      mutationFn: (email) => sendResetEmailApi(email),
      onSuccess: () => {
        toast.success("Check your email for the password reset link");
      },
      onError: () => {
        toast.error("Error: Unable to send password reset email");
      },
    });

  return { sendPasswordResetEmail, isLoadingUpdatePassword };
}
