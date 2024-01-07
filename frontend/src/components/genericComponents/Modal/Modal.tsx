/* eslint-disable prettier/prettier */
import { useDispatch } from 'react-redux';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import './Modal.scss';
import { ReactNode } from 'react';
import { hideModal } from '../../../actions/layout';

const Modal = ({ children, closeModal }: Props) => {

const dispatch = useDispatch();

const handleCloseModal = () => {
  // event listener to the handler component of the modal (most of the time : cancel action)
  closeModal();

  const action = hideModal();
  dispatch(action);
}

// =====================---------------- MODAL ANIMATIONS ----------------====================

const fog = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

const modal = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -200 },
}

// render the component in a targeted element of the DOM
return createPortal (

  <motion.div className="modal"
    initial="hidden"
    animate="visible"
    variants={fog}
    exit={{opacity: 0}}
    >
    <motion.div className="modal-content" variants={modal} exit={{ y: -200, opacity: 0 }}>
    <button type='button' onClick={handleCloseModal} className="modal-close">
      <i className="fa-solid fa-close" />
      <span className="modal-close_wording">close modal</span>
    </button>
    <div className="modal_content">
      {children}
    </div>
    </motion.div>
    <button type='button' onClick={handleCloseModal} className="modal-fog">
      <span className="modal-close_wording">close modal</span>
    </button>
  </motion.div>, document.body
)};

type Props = {
  children: ReactNode,
  closeModal: () => void,
};

export default Modal;
