import './Button.scss';

const Button = ({ type, label, action }: Props) => {
  return (
    <button className="cta" type={type} onClick={(action = () => null)}>
      {label}
    </button>
  );
};

type Props = {
  label: string;
  type: 'submit' | 'reset' | 'button' | undefined;
  action?: () => void | undefined;
};

export default Button;
