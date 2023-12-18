/* eslint-disable prettier/prettier */
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import './Modal.scss';
import { hideModal } from '../../../actions/layout';

const Modal = ({ children, closeModal }) => {

const dispatch = useDispatch();

const handleCloseModal = () => {
  // event listener to the handler component of the modal (most of the time : cancel action)
  closeModal();

  const action = hideModal();
  dispatch(action);
}
return (

  <div className="modal">
    <div className="modal-content">
    <button type='button' onClick={handleCloseModal} className="modal-close">
      <i className="fa-solid fa-close" />
      <span className="modal-close_wording">close modal</span>
    </button>
    <div className="modal_content">
      {children}
    </div>
    </div>
    <button type='button' onClick={handleCloseModal} className="modal-fog">
      <span className="modal-close_wording">close modal</span>
    </button>
  </div>
)};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
