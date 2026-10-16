import type { ReactNode } from 'react'
import './MovieGrid.scss'

type MovieGridProps = {
  children?: ReactNode
}

function MovieGrid({ children }: MovieGridProps) {
  return <section className="movie-grid">{children}</section>
}

export default MovieGrid
