import React, { FC } from 'react';

import './Button.scss';

const Button: FC<Props> = ({
  children,
  label,
  type = 'button',
  ...attributes
}) => {
  return (
    // eslint-disable-next-line react/button-has-type
    <button className="cta" type={type} {...attributes}>
      {label}
      {children}
    </button>
  );
};

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export default Button;
