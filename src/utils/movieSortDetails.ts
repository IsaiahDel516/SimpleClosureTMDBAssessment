import type { Movie } from '../types/movie'
import type { SortBy } from './movieSort'

type SortDetail = {
  label: string
  value: string
}

function formatPopularity(popularity: number): string {
  return popularity.toFixed(1)
}

function formatVoteCount(voteCount: number): string {
  return new Intl.NumberFormat('en-US').format(voteCount)
}

// Returns the sort-related value to show on the card when that value isn't
// already there. Title / rating sorts return null because those are always shown.
export function getFrontSortDetail(
  sortBy: SortBy,
  movie: Movie,
): SortDetail | null {
  switch (sortBy) {
    case 'popularity.asc':
    case 'popularity.desc':
      return {
        label: 'Popularity',
        value: formatPopularity(movie.popularity),
      }
    case 'vote_count.asc':
    case 'vote_count.desc':
      return {
        label: 'Votes',
        value: formatVoteCount(movie.vote_count),
      }
    case 'primary_release_date.asc':
    case 'primary_release_date.desc':
      return {
        label: 'Released',
        value: movie.release_date || 'N/A',
      }
    default:
      // title / original_title / vote_average — already on the card
      return null
  }
}
