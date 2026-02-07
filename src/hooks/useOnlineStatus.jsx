import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  const [isOnline, setOnline] = useState(true);

  useEffect(() => {
    // Sync with actual status on mount
    if (typeof navigator !== "undefined") {
      setOnline(navigator.onLine);
    }

    const handleOnline = () => {
      setOnline(true);
    };

    const handleOffline = () => {
      setOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return [isOnline];
};

export default useOnlineStatus;
