import {
  USERS_QERUEST, USERS_SUCCESS, USERS_FAILURE,
  USER_QERUEST, USER_SUCCESS, USER_FAILURE,
} from './../constants/actionTypes';
import cFetch from './../utils/cFetch';

import {API_CONFIG} from './../config/api';
import {Message} from 'antd';

function requestUsers() {
  return {
    type: USERS_QERUEST,
    isFetching: true
  };
}

function receiveUsers(users) {
  return {
    type: USERS_SUCCESS,
    isFetching: false,
    users
  };
}

function usersError(Message) {
  return {
    type: USERS_FAILURE,
    isFetching: false,
    Message
  };
}

function requestUser() {
  return {
    type: USER_QERUEST,
    isFetching: true
  };
}

function receiveUser(user) {
  return {
    type: USER_SUCCESS,
    isFetching: false,
    user
  };
}

function userError(Message) {
  return {
    type: USER_FAILURE,
    isFetching: false,
    Message
  };
}

export function queryUsers(params) {
  return dispatch => {
    dispatch(requestUsers());
    return cFetch(API_CONFIG.queryUser, {method: "POST", body: JSON.stringify(params)}).then((res) => {
      if (res.jsonResult.returnCode === '1') {
        dispatch(receiveUsers(res.jsonResult));
      } else {
        dispatch(usersError(res.jsonResult.msg));
        Message.error(res.jsonResult.msg);
      }
    });
  };
}

export function getUser(params) {
  return dispatch => {
    dispatch(requestUser());
    return cFetch(API_CONFIG.getUser, {method: "GET", params: params}).then((res) => {
      if (res.jsonResult.returnCode === '1') {
        dispatch(receiveUser(res.jsonResult));
      } else {
        dispatch(userError(res.jsonResult.msg));
        Message.error(res.jsonResult.msg);
      }
    });
  };
}

export function updateUser(creds, cb) {
  return () => {
    return cFetch(API_CONFIG.updateUser, {method: "POST", body: JSON.stringify(creds)}).then((res) => {
      if (res.jsonResult.returnCode === '1') {
        cb && cb(res.jsonResult.msg)
      } else {
        Message.error(res.jsonResult.msg);
      }
    });
  };
}

export function createUser(creds, cb) {
  return () => {
    return cFetch(API_CONFIG.createUser, {method: "POST", body: JSON.stringify(creds)}).then((res) => {
      if (res.jsonResult.returnCode === '1') {
        cb && cb(res.jsonResult.msg)
      } else {
        Message.error(res.jsonResult.msg);
      }
    });
  };
}

export function createSysUser(creds, cb) {
  return dispatch => {
    dispatch(requestCreateUser());
    return cFetch(API_CONFIG.createSysUser, {method: "POST", body: JSON.stringify(creds)}).then((res) => {
      if (res.jsonResult.returnCode === '1') {
        dispatch(receiveCreateUser(res.jsonResult));
        cb && cb(res.jsonResult.msg)
      } else {
        dispatch(createUserError(res.jsonResult.msg));
        Message.error(res.jsonResult.msg);
      }
    });
  };
}

export function toggleActive(params, cb) {
  return () => {
    return cFetch(API_CONFIG.toggleActive, {method: "GET", params: params}).then((res) => {
      if (res.jsonResult.returnCode === '1') {
        cb && cb(res.jsonResult.msg)
      } else {
        Message.error(res.jsonResult.msg);
      }
    });
  };
}
