import { useState } from 'react';
import './Field.scss';

// == Composant
const Field = ({ defaultInputValue, value, type, name, placeholder, onChange }: Props) => {
  const handleChange = (e: React.ChangeEvent) => {
    // replaces field default value by the new value entered
    onChange(setDynamicvalue(e.target.value));

    // pass this new value
    onChange(e.target.value, name);
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
      <input
        // React - state
        value={dynamicvalue}
        onChange={handleChange}
        // infos de base
        id={inputId}
        type={type}
        className="textfield"
        placeholder={placeholder}
        name={name}
      />

      <label htmlFor={inputId} className="field_label">
        {placeholder}
      </label>
    </div>
  );
};

type Props = {
  value?: string | undefined;
  type?: string;
  name: string;
  placeholder: string;
  toto?: string;
  onChange: (event: React.ChangeEvent<HTMLElement>) => void;
};

// Valeurs par défaut pour les props
Field.defaultProps = {
  value: '',
  type: 'text',
  toto: '',
};

// == Export
export default Field;
