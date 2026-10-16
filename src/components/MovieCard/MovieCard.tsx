import { useState } from 'react'
import { Star } from 'lucide-react'
import type { Movie } from '../../types/movie'
import { getBackdropUrl, getPosterUrl } from '../../utils/movieImages'
import { formatVoteAverage } from '../../utils/movieRatings'
import type { SortBy } from '../../utils/movieSort'
import { getFrontSortDetail } from '../../utils/movieSortDetails'
import './MovieCard.scss'

type MovieCardProps = {
  movie: Movie
  sortBy: SortBy
}

function MovieCard({ movie, sortBy }: MovieCardProps) {
  // Flip state lives on the card so each movie can open/close on its own.
  const [isFlipped, setIsFlipped] = useState(false)
  const posterUrl = getPosterUrl(movie.poster_path)
  const backdropUrl = getBackdropUrl(movie.backdrop_path)
  const rating = formatVoteAverage(movie.vote_average)

  // Extra field for sorts that aren't already visible on the card
  // (title + rating always show). Popularity / vote count / release date
  // need this so the current sort still makes sense at a glance.
  const sortDetail = getFrontSortDetail(sortBy, movie)

  // Shared so the front and back stay in sync.
  const ratingDisplay = (
    <div className="movie-card__meta-row">
      <p className="movie-card__rating">
        <Star
          className="movie-card__star"
          size={18}
          fill="currentColor"
          aria-hidden="true"
        />
        <span>
          {rating}
          <span className="movie-card__rating-scale">/10</span>
        </span>
      </p>
      {sortDetail ? (
        <p className="movie-card__sort-detail">
          <span className="movie-card__sort-detail-label">{sortDetail.label}</span>
          <span>{sortDetail.value}</span>
        </p>
      ) : null}
    </div>
  )

  return (
    // Button keeps flip keyboard-accessible without extra handlers.
    <button
      type="button"
      className={`movie-card${isFlipped ? ' movie-card--flipped' : ''}`}
      onClick={() => setIsFlipped((flipped) => !flipped)}
      aria-label={movie.title}
    >
      <div className="movie-card__inner">
        <div className="movie-card__face movie-card__face--front">
          {/* Poster on the front; empty box if TMDB has no image. */}
          {posterUrl ? (
            <img className="movie-card__image movie-card__image--poster" src={posterUrl} alt="" />
          ) : (
            <div className="movie-card__image movie-card__image--poster" aria-hidden="true" />
          )}
          <div className="movie-card__body">
            <h2 className="movie-card__title">{movie.title}</h2>
            {ratingDisplay}
          </div>
        </div>

        <div className="movie-card__face movie-card__face--back">
          {/* Backdrop on the back so the two faces feel different. */}
          {backdropUrl ? (
            <img
              className="movie-card__image movie-card__image--backdrop"
              src={backdropUrl}
              alt=""
            />
          ) : (
            <div
              className="movie-card__image movie-card__image--backdrop"
              aria-hidden="true"
            />
          )}
          <div className="movie-card__body">
            <h2 className="movie-card__title">{movie.title}</h2>
            <p className="movie-card__release">
              <span className="movie-card__label">Release date</span>
              {movie.release_date}
            </p>
            <p className="movie-card__overview">{movie.overview}</p>
            {ratingDisplay}
          </div>
        </div>
      </div>
    </button>
  )
}

export default MovieCard
