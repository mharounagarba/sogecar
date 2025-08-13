import InputBox from './InputBox'
import DateBox from './DateBox'
import AutocompleteBox from './AutocompleteBox'
import TextareaBox from './TextareaBox'
import SelectBox from './SelectBox'
import CheckboxBox from './CheckboxBox'
import './FormEngine.css'
import DateTimeBox from './DateTimeBox'
// Dictionnaire de correspondance des types
const components = {
  text: InputBox,
  number: InputBox,
  date: DateBox,
  datetime: DateBox,
  'datetime-local': DateTimeBox,
  select: SelectBox,
  checkbox: CheckboxBox,
  textarea: TextareaBox,
  autocomplete: AutocompleteBox,
}

export default function FormEngine({ fields, form, handleChange, errors }) {
  return (
    <div className="form-grid">
      {fields.map((field, i) => {
        const type = field.type || 'text'
        const Component = components[type]

        if (!Component) {
          console.warn(`⚠️ Type de champ inconnu : '${type}'`, field)
          return null
        }

        return (
          <Component
            key={i}
            field={field}
            form={form}
            handleChange={handleChange}
            error={errors?.[field.name]}
          />
        )
      })}
    </div>
  )
}
