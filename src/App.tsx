import { useCallback, useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { discoverMovies } from './api/tmdb'
import Header from './components/Header/Header'
import MovieCard from './components/MovieCard/MovieCard'
import MovieGrid from './components/MovieGrid/MovieGrid'
import SortDropdown from './components/SortDropdown/SortDropdown'
import ViewMoreButton from './components/ViewMoreButton/ViewMoreButton'
import type { Movie } from './types/movie'
import { getErrorMessage } from './utils/errors'
import { MAX_ADDITIONAL_PAGES } from './utils/movieQuery'
import { DEFAULT_SORT, type SortBy } from './utils/movieSort'
import './App.scss'

function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [sortBy, setSortBy] = useState<SortBy>(DEFAULT_SORT)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  // Caps how many times the user can click "View more" after the first page.
  const [viewMoreCount, setViewMoreCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Hide the button once we hit our page cap or TMDB has no more pages.
  const canViewMore =
    viewMoreCount < MAX_ADDITIONAL_PAGES && page < totalPages

  const loadMovies = useCallback(
    async (nextPage: number, append: boolean, nextSortBy: SortBy) => {
      setIsLoading(true)
      setError(null)

      try {
        const data = await discoverMovies({
          page: nextPage,
          sortBy: nextSortBy,
        })
        // append=true for "View more"; otherwise replace the list (sort / first load).
        setMovies((current) =>
          append ? [...current, ...data.results] : data.results,
        )
        setPage(data.page)
        setTotalPages(data.total_pages)
        return true
      } catch (err: unknown) {
        setError(getErrorMessage(err, 'Failed to fetch movies'))
        // Keep whatever is already on screen if a "View more" request fails.
        if (!append) {
          setMovies([])
        }
        return false
      } finally {
        setIsLoading(false)
      }
    },
    [],
  )

  // Re-fetch from page 1 whenever sort changes, and reset the view-more budget.
  useEffect(() => {
    setViewMoreCount(0)
    void loadMovies(1, false, sortBy)
  }, [loadMovies, sortBy])

  const handleSortChange = (nextSortBy: SortBy) => {
    if (nextSortBy === sortBy) {
      return
    }

    // Clear immediately so old cards don't briefly show under the new sort labels.
    setMovies([])
    setError(null)
    setSortBy(nextSortBy)
  }

  const handleViewMore = async () => {
    if (!canViewMore || isLoading) {
      return
    }

    const loaded = await loadMovies(page + 1, true, sortBy)
    // Only count successful loads toward the 3-page limit.
    if (loaded) {
      setViewMoreCount((count) => count + 1)
    }
  }

  return (
    <main className="app">
      <Header />
      <div className="app__toolbar">
        <SortDropdown
          value={sortBy}
          onChange={handleSortChange}
          disabled={isLoading}
        />
      </div>
      {error ? <p className="app__error">{error}</p> : null}
      {isLoading && movies.length === 0 ? (
        <p className="app__status">
          <Loader2 className="app__spinner" size={20} aria-hidden="true" />
          Loading movies...
        </p>
      ) : null}
      {!isLoading && !error && movies.length === 0 ? (
        <p className="app__status">No movies found.</p>
      ) : null}
      <MovieGrid>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} sortBy={sortBy} />
        ))}
      </MovieGrid>
      {canViewMore ? (
        <ViewMoreButton
          onClick={() => {
            void handleViewMore()
          }}
          isLoading={isLoading}
        />
      ) : null}
    </main>
  )
}

export default App
