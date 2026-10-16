import {
  getSortLabel,
  SORT_OPTIONS,
  type SortBy,
} from '../../utils/movieSort'
import './SortDropdown.scss'

type SortDropdownProps = {
  value: SortBy
  onChange: (sortBy: SortBy) => void
  disabled?: boolean
}

function SortDropdown({ value, onChange, disabled = false }: SortDropdownProps) {
  return (
    <label className="sort-dropdown">
      <span className="sort-dropdown__label">Sort By:</span>
      <select
        className="sort-dropdown__select"
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value as SortBy)}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {getSortLabel(option)}
          </option>
        ))}
      </select>
    </label>
  )
}

export default SortDropdown
