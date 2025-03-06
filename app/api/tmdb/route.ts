import { NextResponse } from 'next/server';

const CACHE_DURATION = 60 * 60;
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint');
  const language = searchParams.get('language');
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key is required' }, { status: 400 });
  }

  if (!endpoint) {
    return NextResponse.json(
      { error: 'Endpoint is required' },
      { status: 400 }
    );
  }

  const url = new URL(
    `https://api.themoviedb.org/3${endpoint}api_key=${apiKey}&language=${language}`
  );
  try {
    const response = await fetch(url, {
      next: {
        revalidate: CACHE_DURATION,
      },
      headers: {
        'Cache-Control': `s-maxage=${CACHE_DURATION}, stale-while-revalidate`,
      },
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (e: any) {
    const status = e?.response?.status || 500;
    return NextResponse.json(
      { error: String(e).replace(apiKey, '***') },
      { status }
    );
  }
}
