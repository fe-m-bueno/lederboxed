'use client';

import { useEffect, useState } from 'react';

export function useUserCountry() {
  const [country, setCountry] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        if (data.country_code) {
          setCountry(data.country_code);
        }
      } catch (error) {
        console.error('Error fetching country', error);
      }
    };

    fetchCountry();
  }, []);

  return country;
}
