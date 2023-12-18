import { SHOW_MODAL, HIDE_MODAL } from '../actions/layout';

export const initialState = {
  modalVisible: false,
};

/* reducer qui s'occupe de ce qui concerne l'utilisateur */
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        modalVisible: true,
      };
    case HIDE_MODAL:
      return {
        ...state,
        modalVisible: false,
      };

    default:
      return state;
  }
};

export default reducer;
