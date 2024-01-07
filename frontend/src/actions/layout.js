// ici on placera les actions qui concernent le layout du site

export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';
export const SHOW_LOADER = 'SHOW_LOADER';
export const HIDE_LOADER = 'HIDE_LOADER';
export const SHOW_TOASTER = 'SHOW_TOASTER';
export const HIDE_TOASTER = 'HIDE_TOASTER';

export const showModal = () => ({
  type: SHOW_MODAL,
});

export const hideModal = () => ({
  type: HIDE_MODAL,
});

export const showLoader = () => ({
  type: SHOW_LOADER,
});

export const hideLoader = () => ({
  type: HIDE_LOADER,
});

export const showToaster = (step, text) => ({
  type: SHOW_TOASTER,
  step,
  text,
});

export const hideToaster = () => ({
  type: HIDE_TOASTER,
});
