import { useState, useContext } from 'react';
import './Field.scss';
import { ThemeContext } from '../../../../utils/context';

// == Composant
const Field = ({
  defaultInputValue,
  value,
  type,
  name,
  placeholder,
  helper,
  label,
  passwordType,
  onChange,
}: Props) => {
  const { theme } = useContext(ThemeContext);
  const [dynamicvalue, setDynamicvalue] = useState(defaultInputValue);

  const handleChange = (e: React.ChangeEvent) => {
    // replaces field default value by the new value entered
    onChange(setDynamicvalue(e.target.value));

    // pass this new value
    onChange(e.target.value, name);
  };

  const inputId = `field-${name}`;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className={`field ${
        value !== undefined && value.length > 0 ? 'field--has-content' : ''
      }
      `}
    >
      <div className="textfield_wrapper">
        {passwordType ? (
          <input
            value={dynamicvalue}
            onChange={handleChange}
            id={inputId}
            type={showPassword ? 'text' : 'password'}
            className={`textfield ${theme}-theme`}
            placeholder={placeholder}
            name={name}
          />
        ) : (
          <input
            value={dynamicvalue}
            onChange={handleChange}
            id={inputId}
            type={type}
            className={`textfield ${theme}-theme`}
            placeholder={placeholder}
            name={name}
          />
        )}

        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="field_cta"
          >
            <span
              className={`field_cta_icon fa-regular fa-eye${
                showPassword ? '-slash' : ''
              }`}
            />
            <span className="field_cta_wording">
              {showPassword ? 'Cacher mot de passe' : 'Afficher mot de passe'}
            </span>
          </button>
        )}
      </div>

      <label htmlFor={inputId} className="field_label">
        {placeholder}
      </label>

      {helper && <p className="field_helper">{helper}</p>}
    </div>
  );
};

type Props = {
  passwordType?: boolean;
  defaultInputValue?: string | undefined;
  value?: string;
  type?: string;
  name: string;
  placeholder: string;
  label: string;
  helper?: string;
  onChange: (event: React.ChangeEvent<HTMLElement>) => void;
};

// Valeurs par défaut pour les props
Field.defaultProps = {
  passwordType: false,
  defaultInputValue: '',
  value: '',
  type: 'text',
  helper: '',
};

// == Export
export default Field;
