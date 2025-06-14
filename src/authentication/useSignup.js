import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,

    onSuccess: (user) => {
      console.log(user);
      navigate("/home");
      toast.success("Account successfully created!");
    },

    onError: (error) => {
      if (
        error.message.toLowerCase().includes("user already registered") ||
        error.message.toLowerCase().includes("email")
      ) {
        toast.error(
          "This email is already registered. Try signing in instead.",
        );
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  return { signup, isLoading };
}
