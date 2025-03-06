'use client';

import { useEffect, useState, useRef } from 'react';
import { fetchTMDB } from '@/utils/fetchTMDB';
import { useTranslation } from 'react-i18next';

export default function useTMDBFetcher<T>({
  endpoint,
  params = {},
  debounceDelay = 500,
}: {
  endpoint: string;
  params: Record<string, any>;
  debounceDelay?: number;
}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const abortPreviousRequest = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  };

  useEffect(() => {
    if (!endpoint || (params.query && params.query.length < 2)) {
      setData(null);
      setLoading(false);
      return;
    }

    abortPreviousRequest();
    const newController = new AbortController();
    controllerRef.current = newController;

    const queryParams = { ...params };

    const debounceTimer = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchTMDB(
          endpoint,
          queryParams,
          newController.signal
        );
        setData(response);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError('Erro ao buscar dados.');
        }
      } finally {
        setLoading(false);
      }
    }, debounceDelay);

    return () => {
      clearTimeout(debounceTimer);
      abortPreviousRequest();
    };
  }, [endpoint, JSON.stringify(params), debounceDelay]);

  return { data, loading, error };
}
