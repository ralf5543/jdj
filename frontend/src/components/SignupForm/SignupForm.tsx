import Button from '../genericComponents/Button/Button';
import Field from '../genericComponents/Field/Field';

import './SignupForm.scss';

const SignupForm = ({
  email,
  password,
  nickname,
  changeField,
  handleSignup,
}: Props) => {
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    handleSignup();
  };

  return (
    <>
      <h2>Inscription</h2>
      <form
        autoComplete="off"
        className="login-form-element"
        onSubmit={handleSubmit}
      >
        <Field
          name="nickname"
          placeholder="Votre pseudo"
          onChange={changeField}
          value={nickname}
        />
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
        <Button label="Valider l'inscription" type="submit" />
      </form>
    </>
  );
};

type Props = {
  email: string;
  password: string;
  nickname: string;
  changeField: () => void;
  handleSignup: () => void;
};

export default SignupForm;
