// == Import : npm
import PropTypes from 'prop-types';

// == Import : local
import './Textarea.scss';

// == Composant
const Textarea = ({ value, name, placeholder, onChange }) => {
  const handleChange = (evt) => {
    onChange(evt.target.value, name);
  };

  const inputId = `field-${name}`;

  return (
    <div className={value.length > 0 ? 'field field--has-content' : 'field'}>
      <textarea
        onChange={handleChange}
        // infos de base
        id={inputId}
        className="field-input"
        placeholder={placeholder}
        name={name}
        value={value}
      />

      <label htmlFor={inputId} className="field-label">
        {placeholder}
      </label>
    </div>
  );
};

Textarea.propTypes = {
  value: PropTypes.node,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

// Valeurs par défaut pour les props
Textarea.defaultProps = {
  value: '',
};

// == Export
export default Textarea;
