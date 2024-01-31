import React from 'react';
import './Button.scss';

const Button = ({ children, label, type, ...attributes }: Props) => {
  return (
    <button className="cta" type={type} {...attributes}>
      {label}
      {children}
    </button>
  );
};

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode | undefined;
  label: string;
  type: 'submit' | 'reset' | 'button' | undefined;
}

export default Button;
