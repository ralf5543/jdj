// == Import : local
import './Textarea.scss';

// == Composant
const Textarea = ({ value, name, placeholder, onChange }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value, name);
  };

  const inputId = `field-${name}`;

  return (
    <div
      className={
        value !== undefined && value.length > 0
          ? 'field field--has-content'
          : 'field'
      }
    >
      <textarea
        onChange={handleChange}
        // infos de base
        id={inputId}
        className="field-input"
        placeholder={placeholder}
        name={name}
        value={value}
      />

      <label htmlFor={inputId} className="field_label">
        {placeholder}
      </label>
    </div>
  );
};

type Props = {
  value?: string;
  name: string;
  placeholder: string;
  onChange: (arg0: string, arg1: string) => void;
};

// Valeurs par défaut pour les props
Textarea.defaultProps = {
  value: '',
};

// == Export
export default Textarea;
