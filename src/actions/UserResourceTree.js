/**
 * Created by lirui on 2016/9/22.
 */
import {
  TREE_SYS_RES_SUCCESS,TREE_SYS_RES_FAIL,TREE_USER_RES_SUCCESS,TREE_USER_RES_FAIL,TREE_SYS_RES_REQUEST,TREE_USER_RES_REQUEST
} from './../constants/actionTypes';
import cFetch from './../utils/cFetch';

import { API_CONFIG } from './../config/api';
import { message } from 'antd';


function requestUserResTree() {
  return {
    type: TREE_USER_RES_REQUEST,
    isFetching: true
  };
}



export function treeUserRes(params) {
  return dispatch => {
    dispatch(requestUserResTree());
    return cFetch(API_CONFIG.treeUserRes,{ method: "GET", params: params }).then((response) => {
      if (response.jsonResult.returnCode === '1') {
        dispatch(receiveTreeUserRes(response.jsonResult));
      } else {
        dispatch(userResTreeError(response.jsonResult.msg));
        message.error(response.jsonResult.msg);
      }
    });
  };
}


function receiveTreeUserRes(userResTree) {
  return {
    type: TREE_USER_RES_SUCCESS,
    isFetching: false,
    userResTree
  };
}


function userResTreeError(message) {
  return {
    type: TREE_USER_RES_FAIL,
    isFetching: false,
    message
  };
}
