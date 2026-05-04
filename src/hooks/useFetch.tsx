import { useState, useEffect } from "react";

export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useFetch<T>(url: string) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!url) return;

    let cancelled = false;

    const fetchData = async () => {
      setState({ data: null, loading: true, error: null });

      try {
        const response = await fetch(url);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const json = (await response.json()) as T;
        if (!cancelled) setState({ data: json, loading: false, error: null });
      } catch (err) {
        if (!cancelled)
          setState({
            data: null,
            loading: false,
            error: (err as Error).message,
          });
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return state;
}

export default useFetch;
