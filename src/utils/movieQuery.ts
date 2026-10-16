import type { SortBy } from './movieSort'
import { DEFAULT_SORT } from './movieSort'

type DiscoverMovieParams = {
  sort_by?: SortBy
  page?: number
  'primary_release_date.lte'?: string
  'vote_count.gte'?: number
}

// Require enough votes so obscure titles with a tiny sample size cannot
// outrank well-known movies when we sort by vote_average.
const MIN_VOTE_COUNT = 500

// First page loads for free; this is how many extra "View more" clicks we allow.
export const MAX_ADDITIONAL_PAGES = 3

// TMDB wants YYYY-MM-DD for date filters.
function formatDateForTmdb(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function buildDiscoverParams(
  sortBy: SortBy = DEFAULT_SORT,
  page?: number,
): DiscoverMovieParams {
  const params: DiscoverMovieParams = {
    sort_by: sortBy,
    'vote_count.gte': MIN_VOTE_COUNT,
    // Skip unreleased movies so the grid stays useful.
    'primary_release_date.lte': formatDateForTmdb(new Date()),
  }

  if (page !== undefined) {
    params.page = page
  }

  return params
}
