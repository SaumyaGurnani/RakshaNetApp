export default async function handler(request, response) {
  // Extract the path from the incoming request, e.g., /route/v1/driving/....
  const { pathname, searchParams } = new URL(request.url, `http://${request.headers.host}`);
  
  // The part of the path we need starts after /api/osrm, which is captured in pathname
  // For OSRM, the full path including parameters is needed.
  const osrmPath = pathname.replace('/api/osrm', '');
  const apiUrl = `http://router.project-osrm.org${osrmPath}?${searchParams.toString()}`;

  try {
    const fetchResponse = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'RakshaNetApp/1.0',
      },
    });

    if (!fetchResponse.ok) {
      return response.status(fetchResponse.status).json({ error: 'Failed to fetch from OSRM' });
    }

    const data = await fetchResponse.json();
    return response.status(200).json(data);
  } catch (error) {
    return response.status(500).json({ error: 'Internal Server Error' });
  }
}