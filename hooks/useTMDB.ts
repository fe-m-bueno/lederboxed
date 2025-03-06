'use client';

import { useEffect, useState, useMemo, useRef } from 'react';
import { fetchTMDB } from '@/utils/fetchTMDB';
import { useTranslation } from 'react-i18next';

export function useTMDBFetcher(endpoints: string[]) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const prevEndpoints = useRef<string | null>(null);
  const { i18n } = useTranslation();
  const language = i18n.language;

  const memoizedEndpoints = useMemo(() => {
    return endpoints.map((endpoint) => ({ url: endpoint, language }));
  }, [endpoints, language]);

  useEffect(() => {
    if (prevEndpoints.current === JSON.stringify(memoizedEndpoints)) return;
    prevEndpoints.current = JSON.stringify(memoizedEndpoints);

    async function fetchData() {
      setLoading(true);
      const results = await Promise.all(
        memoizedEndpoints.map(({ url }) => fetchTMDB(url))
      );
      setData(results);
      setLoading(false);
    }

    fetchData();
  }, [memoizedEndpoints, language]);

  return { data, loading };
}
