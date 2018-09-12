import { change, actionTypes, untouch } from 'redux-form';

export default ({ dispatch }) => next => action => {
  if (action.type === actionTypes.UNREGISTER_FIELD) {
    dispatch(change(action.meta.form, action.payload.name, null));
    dispatch(untouch(action.meta.form, action.payload.name));
  }
  next(action);
};
