import { useEffect, useRef } from "react";

const useDelayedSearch = (searchFunction, delay, dependencies) => {
  delay = 300;
  const timerIdRef = useRef(null);

  useEffect(() => {
    timerIdRef.current = setTimeout(() => {
      searchFunction();
    }, delay);

    return () => {
      clearTimeout(timerIdRef.current);
    };
  }, dependencies);

  const clearDelay = () => {
    clearTimeout(timerIdRef.current);
  };

  return { clearDelay };
};

export default useDelayedSearch;
