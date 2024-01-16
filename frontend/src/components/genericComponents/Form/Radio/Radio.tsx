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
  const [selectedOption, setSelectedOption] = useState('option1');
  console.log('selectedOption : ', selectedOption);

  const handleChange = (e: React.ChangeEvent) => {
    console.log('ben alors ?');
    console.log('e : ', e);
    console.log('e.target.value : ', e.target.value);
    console.log('value : ', value);
    console.log('selectedOption : ', selectedOption);
    // replaces field default value by the new value entered
    onChange(setDynamicvalue(e.target.value));

    // pass this new value
    // onChange(e.target.value, name);
    onChange(id, name);

    setSelectedOption(e.target.value);
  };

  const [dynamicvalue, setDynamicvalue] = useState(defaultInputValue);

  return (
    <div
      className={
        value !== undefined && value.length > 0
          ? 'field field--has-content'
          : 'field'
      }
    >
      <label className="field_label">
        {placeholder}

        <input
          onChange={handleChange}
          type="radio"
          value={dynamicvalue}
          name={name}
          checked={selectedOption === value}
        />
      </label>
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
