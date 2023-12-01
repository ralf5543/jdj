import PropTypes from 'prop-types';

import Field from '../genericComponents/Field/Field';

import './LoginForm.scss';

/**
 * Affichage d'un formulaire de login (e-mail et mot de passe).
 * Deux modes d'affichage :
 * - mode non connecté : affichage d'un formulaire avec un bouton OK
 * - mode connecté : affichage d'un message de bienvenue avec un bouton Déconnecté
 */
const LoginForm = ({ email, password, changeField, handleLogin, isLogged }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin();
  };

  return (
    <div className="login-form">
      <h2>Connexion</h2>

      {!isLogged && (
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
      )}
    </div>
  );
};

LoginForm.propTypes = {
  /** contenu du champ e-mail */
  email: PropTypes.string.isRequired,
  /** contenu du champ password */
  password: PropTypes.string.isRequired,
  /** Traitement déclenché quand on saisit un caractère dans l'un des deux champs. Paramètres :
   * - newValue Nouvelle valeur du champ
   * - identifier Identifiant du champ : 'email' ou 'password'
   */
  changeField: PropTypes.func.isRequired,
  /** Traitement déclenché quand on clique sur le bouton "OK"
   * (quand on est en mode non connecté) */
  handleLogin: PropTypes.func.isRequired,

  /** Choix entre le mode connecté (affichage d'un message) et
   * le mode pas connecté (affichage du formulaire) */
  isLogged: PropTypes.bool,
};

LoginForm.defaultProps = {
  isLogged: false,
};

export default LoginForm;
