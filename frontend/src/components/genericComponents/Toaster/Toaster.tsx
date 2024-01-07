import './Toaster.scss';
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { hideToaster } from '../../../actions/layout';

const Toaster = () => {
  let icon = '';

  const toasterStep = useSelector((state: Props) => state.toasterReducer.step);
  const toasterText = useSelector((state: Props) => state.toasterReducer.text);

  switch (toasterStep) {
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

  const dispatch = useDispatch();

  // removes the toaster after a few seconds
  setTimeout(() => {
    dispatch(hideToaster());
  }, 5000);

  return createPortal(
    <motion.div
      className={`toaster toaster-${toasterStep}`}
      role="alert"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      exit={{ opacity: 0, y: 100 }}
    >
      <i className={`fa-solid fa-${icon}`} />
      <p className="toaster_text">{toasterText}</p>
    </motion.div>,
    document.body
  );
};

type Props = {
  step?: 'success' | 'error' | 'alert' | 'info';
  text: string;
};

export default Toaster;
