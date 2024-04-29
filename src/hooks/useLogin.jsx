import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    // const localApiUrl = import.meta.env.VITE_APP_LOCAL_API_URL;
    const serverApiUrl = import.meta.env.VITE_APP_SERVER_API_URL;
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${serverApiUrl}/api/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      setIsLoading(false);
      return;
    }

    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(data));

      // dispatch the user to the global state
      dispatch({ type: "LOGIN", payload: data });

      setIsLoading(false);

      return;
    }
  };

  return { login, error, isLoading };
};
