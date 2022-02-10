import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://weatherapi-com.p.rapidapi.com/${requestConfig.endPoint}`,
        {
          method: requestConfig.method ? requestConfig.method : "GET",
          headers: {
            "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
            "x-rapidapi-key":
              "e7343753f1mshcfaedb853d85361p1eaaa0jsn60a062c5cc83",
          },
          body: requestConfig.body ? requestConfig.body : null,
        }
      );

      if (!response.ok) {
        throw new Error("Request Failed!");
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
