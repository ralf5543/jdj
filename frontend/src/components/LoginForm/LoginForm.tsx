import Field from '../genericComponents/Field/Field';

import './LoginForm.scss';

const LoginForm = ({ email, password, changeField, handleLogin }: Props) => {
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="login-form">
      <h2>Connexion</h2>

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

type Props = {
  email: string;
  password: string;
  changeField: () => void;
  handleLogin: () => void;
};

export default LoginForm;
