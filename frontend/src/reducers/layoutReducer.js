import {
  SHOW_MODAL,
  HIDE_MODAL,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_TOASTER,
  HIDE_TOASTER,
} from '../actions/layout';

export const initialState = {
  modalVisible: false,
  isLoading: false,
};

export const toasterInitialState = {
  toasterVisible: false,
  step: '',
  text: '',
};

export const toasterReducer = (state = toasterInitialState, action = {}) => {
  switch (action.type) {
    case SHOW_TOASTER:
      return {
        ...state,
        toasterVisible: true,
        step: action.step,
        text: action.text,
      };
    case HIDE_TOASTER:
      return {
        ...state,
        toasterVisible: false,
      };

    default:
      return state;
  }
};

export const layoutReducer = (state = initialState, action = {}) => {
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
    case SHOW_LOADER:
      return {
        ...state,
        isLoading: true,
      };
    case HIDE_LOADER:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
