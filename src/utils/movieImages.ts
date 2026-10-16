import { env } from '../config/env'

type ImageSize = 'w300' | 'w500' | 'w780' | 'w1280' | 'original'

// TMDB only gives a path; we build the full CDN URL. w500 is a solid default.
function getImageUrl(
  path: string | null,
  size: ImageSize = 'w500',
): string | null {
  if (!path) {
    return null
  }

  return `${env.tmdbImageBaseUrl}/${size}${path}`
}

export function getBackdropUrl(
  backdropPath: string | null,
  size: ImageSize = 'w500',
): string | null {
  return getImageUrl(backdropPath, size)
}

export function getPosterUrl(
  posterPath: string | null,
  size: ImageSize = 'w500',
): string | null {
  return getImageUrl(posterPath, size)
}
