import axios from 'axios'
import { env } from '../config/env'
import type { DiscoverMoviesResponse } from '../types/movie'
import { buildDiscoverParams } from '../utils/movieQuery'
import type { SortBy } from '../utils/movieSort'
import { DEFAULT_SORT } from '../utils/movieSort'

// Shared client so every request gets the base URL, timeout, and API key.
const tmdbClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 15000,
  params: {
    api_key: env.tmdbApiKey,
  },
})

type DiscoverMoviesOptions = {
  sortBy?: SortBy
  page?: number
}

export async function discoverMovies({
  sortBy = DEFAULT_SORT,
  page,
}: DiscoverMoviesOptions = {}) {
  const { data } = await tmdbClient.get<DiscoverMoviesResponse>(
    '/discover/movie',
    {
      params: buildDiscoverParams(sortBy, page),
    },
  )

  // Guard against a weird payload so the UI doesn't blow up on .map later.
  if (!Array.isArray(data.results)) {
    throw new Error('Unexpected movie response from TMDB')
  }

  return data
}
