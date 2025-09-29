export default async function handler(request, response) {
  const { searchParams } = new URL(request.url, `http://${request.headers.host}`);
  const apiUrl = `https://nominatim.openstreetmap.org/reverse?${searchParams.toString()}`;

  try {
    const fetchResponse = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'RakshaNetApp/1.0',
      },
    });

    if (!fetchResponse.ok) {
      return response.status(fetchResponse.status).json({ error: 'Failed to fetch from Nominatim' });
    }

    const data = await fetchResponse.json();
    return response.status(200).json(data);
  } catch (error) {
    return response.status(500).json({ error: 'Internal Server Error' });
  }
}