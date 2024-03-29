import { useDispatch } from 'react-redux';
import Button from '../genericComponents/Button/Button';
import Field from '../genericComponents/Form/Field/Field';
import { showToaster } from '../../actions/layout';

import './SignupForm.scss';

const SignupForm = ({
  email,
  password,
  nickname,
  changeField,
  handleSignup,
}: Props) => {
  const dispatch = useDispatch();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    // 8 characters, and at least 1 uppercase, 1 lowercase, 1 special character, 1 number
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!password) {
      dispatch(showToaster('error', 'Il manque le mot de passe, hein...'));
    } else if (!passwordRegex.test(password)) {
      dispatch(
        showToaster('error', "Votre mot de passe n'est pas assez sécurisé")
      );
    } else {
      handleSignup();
    }
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
          label="Pseudo"
          placeholder="George Abitbol"
          onChange={changeField}
          value={nickname}
        />
        <Field
          name="email"
          type="email"
          label="Email"
          placeholder="george@abitbol.com"
          onChange={changeField}
          value={email}
        />
        <Field
          name="password"
          type="password"
          passwordType
          label="Mot de passe"
          placeholder="Mot de passe"
          onChange={changeField}
          value={password}
          helper="Votre mot de passe doit comporter au moins 8 caractères, dont une
          minuscule, une majuscule, un chiffre et un caractère spécial (oui c'est
          relou...)."
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
