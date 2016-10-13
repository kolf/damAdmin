import {
  USER_QERUEST, USER_SUCCESS, USER_FAILURE,
} from './../constants/actionTypes';
import initialState from './initialState';

export default function users(state = initialState.user, action) {
  switch (action.type) {
    case USER_QERUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case USER_SUCCESS:
      return Object.assign({}, {
        isFetching: false,
        errorMessage: '',
        data: action.user.data
      });
    case USER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      });
    default:
      return state;
  }
}
