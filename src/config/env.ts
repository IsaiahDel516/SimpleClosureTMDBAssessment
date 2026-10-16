const apiKey = import.meta.env.VITE_TMDB_API_KEY

if (!apiKey) {
  throw new Error('Missing VITE_TMDB_API_KEY. Copy .env.example to .env and set your key.')
}

export const env = {
  tmdbApiKey: apiKey as string,
}
