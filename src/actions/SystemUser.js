/**
 * Created by lirui on 2016/9/25.
 */
import {
  SYSTEM_USER_REQUEST,SYSTEM_USER_SUCCESS,SYSTEM_USER_FAIL
} from './../constants/actionTypes';
import cFetch from './../utils/cFetch';

import { API_CONFIG } from './../config/api';
import { message } from 'antd';



function requestSystemUsers() {
  return {
    type: SYSTEM_USER_REQUEST,
    isFetching: true
  };
}

function receiveSystemUsers(systemUsers) {
  console.log('-------------------1111111111111111111111111111111-----');
  console.log(systemUsers);
  console.log('-------------------2222222222222222222222222222222-----');
  return {
    type: SYSTEM_USER_SUCCESS,
    isFetching: false,
    systemUsers
  };
}

function systemUsersError(message) {
  return {
    type: SYSTEM_USER_FAIL,
    isFetching: false,
    message
  };
}




export function querySystemUsers(params) {
  return dispatch => {
    dispatch(requestSystemUsers());
    return cFetch(API_CONFIG.querySystemUser, { method: "GET", params: params }).then((res) => {
      if (res.jsonResult.returnCode === '1') {
        dispatch(receiveSystemUsers(res.jsonResult));
      } else {
        dispatch(systemUsersError(res.jsonResult.msg));
        message.error(res.jsonResult.msg);
      }
    });
  };
}




