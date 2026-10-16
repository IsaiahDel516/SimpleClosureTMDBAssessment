import './ViewMoreButton.scss'

type ViewMoreButtonProps = {
  onClick: () => void
  isLoading?: boolean
}

function ViewMoreButton({ onClick, isLoading = false }: ViewMoreButtonProps) {
  return (
    <button
      type="button"
      className="view-more-button"
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : 'View more'}
    </button>
  )
}

export default ViewMoreButton
