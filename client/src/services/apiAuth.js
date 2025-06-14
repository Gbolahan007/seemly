import supabase from "../supabase";

// Sign up a new user with email, password, and full name
export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

// Log in a user using email and password
export async function Login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

// Get the currently authenticated user
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

// Send password reset email with redirect URL after reset
export async function sendPasswordResetEmail(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "https://seemly.vercel.app/update-password",
  });

  if (error) throw new Error(error.message);

  return data;
}

// Update user's password
export async function updatePassword(newPassword) {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw new Error(error.message);

  return data;
}
