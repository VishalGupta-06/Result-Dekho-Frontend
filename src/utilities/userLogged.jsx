import { useEffect, useState } from "react";
import axios from "axios";

function useLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    let ignore = false;

    const checkAuth = async () => {
      try {
        const response = await axios.post(
          "/api/current-user",
          {},
          {
            withCredentials: true,
          }
        );

        if (!ignore) {
          setIsLoggedIn(response.data?.success !== false);
        }
      } catch (error) {
        console.log(error.response?.data ?? error.message);
        setIsLoggedIn(false);
      }
    };

    checkAuth();
    return () => {
      ignore = true;
    };
  }, []);

  return isLoggedIn;
}

export default useLoggedIn;
