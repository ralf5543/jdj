import { useState } from 'react';
import './Radio.scss';

// == Composant
const Radio = ({
  defaultInputValue,
  value,
  name,
  placeholder,
  id,
  onChange,
}: Props) => {
  const [dynamicvalue, setDynamicvalue] = useState(defaultInputValue);

  const handleChange = (e: React.ChangeEvent) => {
    // replaces field default value by the new value entered
    onChange(setDynamicvalue(e.target.value));

    // pass this new value
    // onChange(e.target.value, name);
    onChange(id, name);
  };

  return (
    <div
      className={
        value !== undefined && value.length > 0
          ? 'field field--has-content'
          : 'field'
      }
    >
      <input
        onChange={handleChange}
        type="radio"
        value={dynamicvalue}
        name={name}
        id={id}
      />
      <label htmlFor={id}>{placeholder}</label>
    </div>
  );
};

type Props = {
  value?: string;
  defaultInputValue?: string | undefined;
  name: string;
  id: string;
  placeholder: string;
  onChange: (arg0: string, arg1: string) => void;
};

// Valeurs par défaut pour les props
Radio.defaultProps = {
  value: '',
  defaultInputValue: '',
};

export default Radio;
