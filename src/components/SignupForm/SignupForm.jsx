import PropTypes from 'prop-types';

import Field from '../genericComponents/Field/Field';

import './SignupForm.scss';

const SignupForm = ({ email, password, changeField, handleSignup }) => {
  const handleSubmit = (evt) => {
    console.log('toto');
    evt.preventDefault();
    handleSignup();
    console.log('tata');
  };

  return (
    <div>
      <h2>Inscription</h2>
      <form
        autoComplete="off"
        className="login-form-element"
        onSubmit={handleSubmit}
      >
        <Field
          name="email"
          placeholder="Adresse Email"
          onChange={changeField}
          value={email}
        />
        <Field
          name="password"
          type="password"
          placeholder="Mot de passe"
          onChange={changeField}
          value={password}
        />
        <button type="submit" className="login-form-button">
          OK
        </button>
      </form>
    </div>
  );
};

SignupForm.propTypes = {
  /** contenu du champ e-mail */
  email: PropTypes.string.isRequired,
  /** contenu du champ password */
  password: PropTypes.string.isRequired,
  /** Traitement déclenché quand on saisit un caractère dans l'un des deux champs. Paramètres :
   * - newValue Nouvelle valeur du champ
   * - identifier Identifiant du champ : 'email' ou 'password'
   */
  changeField: PropTypes.func.isRequired,

  handleSignup: PropTypes.func.isRequired,
};

export default SignupForm;
