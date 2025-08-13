import { useState } from 'react'
import './InputBox.css'

export default function AutocompleteBox({ field, form, handleChange, fetchOptions }) {
  const { name, label, required, col = 6 } = field
  const [suggestions, setSuggestions] = useState([])
  const [focused, setFocused] = useState(false)

  const handleInput = async (e) => {
    const value = e.target.value
    handleChange(e)
    if (value.length >= 2 && fetchOptions) {
      const result = await fetchOptions(value)
      setSuggestions(result)
    } else {
      setSuggestions([])
    }
  }

  const selectSuggestion = (suggestion) => {
    handleChange({ target: { name, value: suggestion.value } })
    setSuggestions([])
  }

  return (
    <div className={`input-box col-${col}`}>
      <input
        name={name}
        value={form[name]}
        onChange={handleInput}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 100)} // pour cliquer suggestion
        required={required}
        placeholder=" "
         className="input-field"
      />
      <label className="input-label">{label}</label>
      {focused && suggestions.length > 0 && (
        <ul className="autocomplete-list">
          {suggestions.map((s, i) => (
            <li key={i} onClick={() => selectSuggestion(s)}>
              {s.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}


// exemple
{/* <AutocompleteBox
  field={{ name: 'matricule', label: 'Assuré', col: 6 }}
  form={form}
  handleChange={handleChange}
  fetchOptions={(query) => window.api.searchAssures(query)} // [{ value, label }]
/> */}
