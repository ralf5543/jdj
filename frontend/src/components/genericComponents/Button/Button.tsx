import './Button.scss';

const Button = ({ type, label }: Props) => {
  return <button className="cta" type={(type = 'button')}>{label}</button>;
};

type Props = {
  label: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
};

export default Button;
