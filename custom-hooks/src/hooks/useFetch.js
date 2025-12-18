import { useEffect, useState } from "react";

export function useFetch(nameFunction, initialData) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [dataFetching, setDataFetching] = useState(initialData);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await nameFunction();
        setDataFetching(data);
      } catch (error) {
        setError({ message: error.message || "Failed to fetch data." });
      }

      setIsFetching(false);
    }

    fetchData();
  }, []);
  return {
    isFetching,
    error,
    dataFetching,
    setDataFetching
  }
}
