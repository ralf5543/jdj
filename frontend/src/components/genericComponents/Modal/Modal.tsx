/* eslint-disable prettier/prettier */
import { useDispatch } from 'react-redux';
import { createPortal } from 'react-dom';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import './Modal.scss';
import { ReactNode, useContext } from 'react';
import { hideModal } from '../../../actions/layout';
import { ThemeContext } from '../../../utils/context';

const Modal = ({ children, closeModal }: Props) => {

const { theme } = useContext(ThemeContext);

const dispatch = useDispatch();

const handleCloseModal = () => {
  // event listener to the handler component of the modal (most of the time : cancel action)
  closeModal();

  const action = hideModal();
  dispatch(action);
}

// =====================---------------- MODAL ANIMATIONS ----------------====================

const fog = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.3
    }
  }
}

const modal = {
  show: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -200 },
}

// render the component in a targeted element of the DOM
return createPortal (
<LazyMotion features={domAnimation}>
  <m.div className="modal"
    initial="hidden"
    animate="show"
    variants={fog}
    exit={{opacity: 0}}
    >
    <m.div className={`modal-content ${theme}-theme`} variants={modal} exit={{ y: -200, opacity: 0 }}>
    <button type='button' onClick={handleCloseModal} className="modal-close">
      <i className="fa-solid fa-close" />
      <span className="modal-close_wording">close modal</span>
    </button>
    <div className="modal_content">
      {children}
    </div>
    </m.div>
    <button type='button' onClick={handleCloseModal} className="modal-fog">
      <span className="modal-close_wording">close modal</span>
    </button>
  </m.div>
  </LazyMotion>
  , document.body
)};

type Props = {
  children: ReactNode,
  closeModal: () => void,
};

export default Modal;
