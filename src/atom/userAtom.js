import { atom } from "recoil";

// Helper function to get user data from localStorage
const getUserFromLocalStorage = () => {
  if (typeof window !== "undefined") { // Check if window object is available
    const storedUser = localStorage.getItem("amsjbckumr");
    return storedUser ? JSON.parse(storedUser) : null; // Parse if data exists
  }
  return null; // Return null for SSR
};

const userAtom = atom({
  key: "userAtom",
  default: getUserFromLocalStorage(), // Use the helper function for default
});

export default userAtom;
