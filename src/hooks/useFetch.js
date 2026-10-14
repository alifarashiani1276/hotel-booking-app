import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

// fetcher: تابعی که یه Promise برمی‌گردونه (مثلاً getHotels از src/api/db.js)
// deps: هر وقت این آرایه عوض بشه، دوباره دیتا گرفته می‌شه
export default function useFetch(fetcher, deps = []) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  useEffect(() => {
    let cancelled = false;
    async function fetchData() {
      try {
        setIsLoading(true);
        const result = await fetcherRef.current();
        if (!cancelled) setData(result);
      } catch (err) {
        if (!cancelled) {
          setData([]);
          toast.error(err?.message);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchData();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { isLoading, data };
}
