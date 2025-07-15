import './InputBox.css'

export default function CheckboxBox({ field, form, handleChange }) {
  return (
    <div className={`input-box col-${field.col || 3}`}>
      <label  className="input-label">
        <input
          type="checkbox"
          name={field.name}
          checked={form[field.name]}
          onChange={handleChange}
        />
        {field.label}
      </label>
    </div>
  )
}
