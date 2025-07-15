import './InputBox.css'

export default function DateTimeBox({ field, form, handleChange, error }) {
  return (
    <div className={`input-box col-${field.col || 3}`}>
      <input
        type={field.type}
        name={field.name}
        value={form[field.name] || ''}
        onChange={handleChange}
        required={field.required}
        placeholder=" "
      />
      <label className="input-label">{field.label}</label>
      {error && <small className="error-msg">{error}</small>}
    </div>
  )
}
