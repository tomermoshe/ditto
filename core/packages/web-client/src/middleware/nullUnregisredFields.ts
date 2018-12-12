import { change, actionTypes, untouch, formValueSelector } from 'redux-form';

export default ({ getState, dispatch }) => next => action => {
  if (action.type === actionTypes.UNREGISTER_FIELD) {
    const selector = formValueSelector(action.meta.form);
    if (selector(getState(), action.payload.name)) {
      dispatch(change(action.meta.form, action.payload.name, null));
      dispatch(untouch(action.meta.form, action.payload.name));
    }
  }
  next(action);
};
