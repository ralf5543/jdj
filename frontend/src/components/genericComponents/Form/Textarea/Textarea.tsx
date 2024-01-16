import { useState } from 'react';
import './Textarea.scss';

// == Composant
const Textarea = ({
  defaultInputValue,
  value,
  name,
  placeholder,
  onChange,
}: Props) => {
  const handleChange = (e: React.ChangeEvent) => {
    // replaces field default value by the new value entered
    onChange(setDynamicvalue(e.target.value));

    // pass this new value
    onChange(e.target.value, name);
    console.log('dynamicvalue : ', dynamicvalue);
  };

  const [dynamicvalue, setDynamicvalue] = useState(defaultInputValue);

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
        value={dynamicvalue}
      />

      <label htmlFor={inputId} className="field_label">
        {placeholder}
      </label>
    </div>
  );
};

type Props = {
  value?: string;
  defaultInputValue?: string | undefined;
  name: string;
  placeholder: string;
  onChange: (arg0: string, arg1: string) => void;
};

// Valeurs par défaut pour les props
Textarea.defaultProps = {
  value: '',
  defaultInputValue: '',
};

// == Export
export default Textarea;
