import './InputBox.css'

export default function TextareaBox({ field, form, handleChange, error }) {
  const {
    name,
    label,
    required = false,
    col = 6,
    rows = 3,
  } = field

  const value = form[name] ?? ''

  return (
    <div className={`input-box col-${col} ${error ? 'has-error' : ''}`}>
      <textarea
        name={name}
        value={value}
        onChange={handleChange}
        required={required}
        rows={rows}
        placeholder=" "
        className="input-field"
      />
      <label className="input-label">
        {label}{required && ' *'}
      </label>
      {error && <div className="input-error">{error}</div>}
    </div>
  )
}

// exemple
{/* <TextareaBox
  field={{ name: 'description', label: 'Description', required: false, col: 12 }}
  form={form}
  handleChange={handleChange}
  error={errors.description}
/> */}
