import './InputBox.css'

export default function InputBox({ field, form, handleChange, error }) {
  const {
    name,
    label,
    type = 'text',
    required = false,
    col = 3,
    options = []
  } = field

  const isSelect = type === 'select'
  const value = form[name] ?? ''

  return (
    <div className={`input-box col-${col } ${error ? 'has-error' : ''}`}>
      {isSelect ? (
        <select
          name={name}
          value={value}
          onChange={handleChange}
          required={required}
          className="input-field"
        >
          <option value=""> Sélectionner </option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          required={required}
          placeholder=" "
          className="input-field"
        />
      )}

      <label className="input-label">
        {label}{required && ' *'}
      </label>

      {error && <div className="input-error">{error}</div>}
    </div>
  )
}
