// TMDB discover sort values. Revenue isn't included — discover doesn't support it.
export const SORT_OPTIONS = [
  'original_title.asc',
  'original_title.desc',
  'popularity.asc',
  'popularity.desc',
  'primary_release_date.asc',
  'primary_release_date.desc',
  'title.asc',
  'title.desc',
  'vote_average.asc',
  'vote_average.desc',
  'vote_count.asc',
  'vote_count.desc',
] as const

export type SortBy = (typeof SORT_OPTIONS)[number]

// Highest rated first; paired with vote_count.gte in movieQuery.
export const DEFAULT_SORT: SortBy = 'vote_average.desc'

const SORT_LABELS: Record<SortBy, string> = {
  'original_title.asc': 'Original title (A-Z)',
  'original_title.desc': 'Original title (Z-A)',
  'popularity.asc': 'Popularity (Low to High)',
  'popularity.desc': 'Popularity (High to Low)',
  'primary_release_date.asc': 'Release date (Oldest)',
  'primary_release_date.desc': 'Release date (Newest)',
  'title.asc': 'Title (A-Z)',
  'title.desc': 'Title (Z-A)',
  'vote_average.asc': 'Rating (Low to High)',
  'vote_average.desc': 'Rating (High to Low)',
  'vote_count.asc': 'Vote count (Low to High)',
  'vote_count.desc': 'Vote count (High to Low)',
}

export function getSortLabel(sortBy: SortBy): string {
  return SORT_LABELS[sortBy]
}
