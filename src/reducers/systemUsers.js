/**
 * Created by lirui on 2016/9/25.
 */
import {
  SYSTEM_USER_REQUEST, SYSTEM_USER_SUCCESS, SYSTEM_USER_FAIL
} from './../constants/actionTypes';
import initialState from './initialState';


export default function systemUsers(state = initialState.systemUsers, action) {
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  console.log(initialState.systemUsers);
  console.log(action);
  console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");



  switch (action.type) {
    case SYSTEM_USER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case SYSTEM_USER_SUCCESS:
      return Object.assign({}, {
        isFetching: false,
        errorMessage: '',
        meta: {
          total: 10,
          pageSize: 10,
          pageNum: 1
        },
        data: action.systemUsers.data
      });
    case SYSTEM_USER_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      });
    default:
      return state;
  }

}
