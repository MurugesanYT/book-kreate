
import { auth } from "@/lib/firebase";

export const getCurrentUserId = () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }
  return user.uid;
};

export const createEmailKey = (email: string) => {
  return email.replace(/\./g, '_').replace(/[@]/g, '_');
};
