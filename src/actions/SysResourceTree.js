/**
 * Created by lirui on 2016/9/22.
 */
import {
 TREE_SYS_RES_SUCCESS,TREE_SYS_RES_FAIL,TREE_USER_RES_SUCCESS,TREE_USER_RES_FAIL,TREE_SYS_RES_REQUEST,TREE_USER_RES_REQUEST
} from './../constants/actionTypes';
import cFetch from './../utils/cFetch';

import { API_CONFIG } from './../config/api';
import { message } from 'antd';


function requestSysResTree() {
  return {
    type: TREE_SYS_RES_REQUEST,
    isFetching: true
  };
}


export function treeSysRes(params) {
  return dispatch => {
    dispatch(requestSysResTree());
    return cFetch(API_CONFIG.treeSysRes,{ method: "GET", params: params }).then((response) => {
      if (response.jsonResult.returnCode === '1') {
        dispatch(receiveTreeSysRes(response.jsonResult));
      } else {
        dispatch(sysResTreeError(response.jsonResult.msg));
        message.error(response.jsonResult.msg);
      }
    });
  };
}


function receiveTreeSysRes(sysResTree) {
  return {
    type: TREE_SYS_RES_SUCCESS,
    isFetching: false,
    sysResTree
  };
}



function sysResTreeError(message) {
  return {
    type: TREE_SYS_RES_FAIL,
    isFetching: false,
    message
  };
}






