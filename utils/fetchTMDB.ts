import i18n from '../utils/i18n';

export async function fetchTMDB(
  endpoint: string,
  params: Record<string, any> = {},
  signal?: AbortSignal
) {
  const langMap: Record<string, string> = {
    en: 'en-US',
    es: 'es-ES',
    pt: 'pt-BR',
  };
  const detectedLang = i18n.language.split('-')[0];
  const language = langMap[detectedLang] || 'en-US';

  if (!params.language) {
    params.language = language;
  }
  const separator = endpoint.includes('?') ? '&' : '?';

  const queryParams = new URLSearchParams(params).toString();
  const url = `/api/tmdb?endpoint=${encodeURIComponent(endpoint)}${
    queryParams ? separator + queryParams : ''
  }`;
  try {
    console.log('Fetching TMDB:', url, 'Language:', language);
    const response = await fetch(url, { signal, cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`Error fetching TMDB: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetchTMDB:', error);
    return null;
  }
}
