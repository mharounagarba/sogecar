import './InputBox.css'

export default function DateBox({ field, form, handleChange }) {
  const { name, label, required, col = 3 } = field

  return (
    <div className={`input-box col-${col}`}>
      <input
        type="date"
        name={name}
        value={form[name]}
        onChange={handleChange}
        required={required}
        placeholder=" "
      />
      <label className="input-label">{label}</label>
    </div>
  )
}
