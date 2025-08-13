import './InputBox.css'

export default function SelectBox({ field, form, handleChange }) {
  return (
    <div className={`input-box col-${field.col || 3}`}>
      <select
        name={field.name}
        value={form[field.name]}
        onChange={handleChange}
        required={field.required}
      >
        <option value="">-- Sélectionner --</option>
        {field.options?.map(opt => (
          <option key={opt.value || opt} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
      <label className="input-label">{field.label}</label>
    </div>
  )
}
