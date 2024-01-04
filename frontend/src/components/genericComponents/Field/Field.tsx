// == Import : local
import './Field.scss';
import { ChangeEvent } from 'react';

// == Composant
const Field = ({ value, type, name, placeholder, onChange }: Props) => {
  const handleChange = (e: React.ChangeEvent) => {
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
      <input
        // React - state
        value={value}
        onChange={handleChange}
        // infos de base
        id={inputId}
        type={type}
        className="field-input"
        placeholder={placeholder}
        name={name}
      />

      <label htmlFor={inputId} className="field-label">
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
  onChange: (event: React.ChangeEvent<HTMLElement>) => void;
};

// Valeurs par défaut pour les props
Field.defaultProps = {
  value: '',
  type: 'text',
};

// == Export
export default Field;
