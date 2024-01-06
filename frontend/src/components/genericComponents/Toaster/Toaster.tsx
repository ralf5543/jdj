import './Toaster.scss';
import { createPortal } from 'react-dom';

const Toaster = ({ text, step = 'info' }: Props) => {
  let icon = '';

  switch (step) {
    case 'success':
      icon = 'check';
      break;
    case 'alert':
      icon = 'triangle-exclamation';
      break;
    case 'error':
      icon = 'xmark';
      break;
    default:
      icon = 'circle-info';
  }

  return createPortal(
    <div className={`toaster toaster-${step}`}>
      <i className={`fa-solid fa-${icon}`} />
      <p className="toaster_text">{text}</p>
    </div>,
    document.body
  );
};

type Props = {
  step?: 'success' | 'error' | 'alert' | 'info';
  text: string;
};

export default Toaster;
