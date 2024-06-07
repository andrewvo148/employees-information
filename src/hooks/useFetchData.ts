import { useState, useEffect } from 'react';


// Define the hook
function useFetchData<T>(model: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/data/${model}`);
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [model]);

  return { data, loading, error };
}

export default useFetchData;
