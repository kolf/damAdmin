/**
 * Created by linsheng.yan on 2016/10/9.
 */
import {
  PRODUCT_QERUEST, PRODUCT_SUCCESS, PRODUCT_FAILURE
} from './../constants/actionTypes';
import cFetch from './../utils/cFetch';
import cookie from 'js-cookie';
import { API_CONFIG } from './../config/api';
import { message } from 'antd';

const token = cookie.get('token');
function requestProduct() {
  return {
    type: PRODUCT_QERUEST,
    isFetching: true
  };
}

function receiveProduct(product) {
  return {
    type: PRODUCT_SUCCESS,
    isFetching: false,
    product
  };
}

function productError(message) {
  return {
    type: PRODUCT_FAILURE,
    isFetching: false,
    message
  };
}

export function getProduct(params, cb){
  return dispatch => {
    dispatch(requestProduct());
    return cFetch(API_CONFIG.getProduct, { method: "GET", params: params }).then((response) => {
      if (response.jsonResult.returnCode === '1') {
        let chanpin=response.jsonResult;
        dispatch(receiveProduct(chanpin));
        cb && cb(chanpin.data)
      } else {
        dispatch(productError(response.jsonResult.msg));
        message.error(response.jsonResult.msg);
      }
    });
  };
}

export function updateProduct(params, cb){
  return dispatch => {
    // dispatch(requestProduct());
    return cFetch(API_CONFIG.updateProduct, { method: "POST", body:JSON.stringify(params)}).then((response) => {
      if (response.jsonResult.returnCode === '1') {
        // dispatch(receiveProduct(response.jsonResult));
        cb && cb()
      } else {
        // dispatch(productError(response.jsonResult.msg));
        message.error(response.jsonResult.msg);
      }
    });
  };
}

export function activeProduct(params, cb){
  return () => {
    return cFetch(API_CONFIG.activeProduct, { method: "GET", params: params}).then((response) => {
      if (response.jsonResult.returnCode === '1') {
        cb && cb(response.jsonResult.msg)
      } else {
        message.error(response.jsonResult.msg);
      }
    });
  };
}
