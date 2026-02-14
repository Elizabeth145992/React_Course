import { useState, useCallback, useEffect } from "react";

async function fetchData(url, config) {
  const response = await fetch(url, config);
  const responseData = response.json();

  if (!response.ok) {
    throw new Error(
      responseData.message || "Something went wrong, failed to send request.",
    );
  }
  return responseData;
}

export default function useRequestApi(url, config, initialData) {
    const [error, setError] = useState();
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(false);

  function clearData(){
    setData(initialData);
  }

  const sendRequest = useCallback(
    async function sendRequest(data){
      config = data ? {...config, body: data} : config;
  
      setLoading(true);
        try {
         const responseData = await fetchData(url, config);
         setData(responseData);
        } catch (errorResponse) {
            setError(errorResponse.message || "Something went wrong!");
        }
        setLoading(false);
    }, [url, config]);

    useEffect(() => {
      console.log(config);
      if(config && (config.method === 'GET' || !config.method || !config)){
        sendRequest();
      }
    },[sendRequest, config])

    return {
      data,
      error,
      loading,
      sendRequest,
      clearData
    }
}
