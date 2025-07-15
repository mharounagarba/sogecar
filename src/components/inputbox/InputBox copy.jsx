import './InputBox.css'
export default function InputBox({field, form, handleChange}) {

    return (
        <div className={`input-box col-${field.col?field.col:3}`}>
            <input
                name={field.name}
                type={field.type || 'text'}
                value={form[field.name]}
                onChange={handleChange}
                required={field.required}
                placeholder=" "
            />
            <label>{field.label}</label>
        </div>

    )

}