/**
 * Created by linsheng.yan on 2016/10/9.
 */
import {
  PRODUCT_QERUEST, PRODUCT_SUCCESS, PRODUCT_FAILURE,
  UPDATE_PRODUCT_QERUEST,UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAILURE
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

}function requestUpdataProduct() {
  return {
    type: UPDATE_PRODUCT_QERUEST,
    isFetching: true
  };
}

function receiveUpdateProduct(product) {
  return {
    type: UPDATE_PRODUCT_SUCCESS,
    isFetching: false,
    product
  };
}

function updateProductError(message) {
  return {
    type: UPDATE_PRODUCT_FAILURE,
    isFetching: false,
    message
  };
}

export function viewProduct(paramid){
  return dispatch => {
    dispatch(requestProduct());
    return cFetch(API_CONFIG.viewProduct, { method: "GET", params: {id:paramid,token:token} }).then((response) => {
      if (response.jsonResult.returnCode === '1') {
        let chanpin=response.jsonResult;
        dispatch(receiveProduct(chanpin));
      } else {
        dispatch(productError(response.jsonResult.error_message));
        message.error(response.jsonResult.error_message);
      }
    });
  };
}

export function updateProduct(params, cb){
  return dispatch => {
    dispatch(requestUpdataProduct());
    return cFetch(API_CONFIG.updateProduct, { method: "POST", body:JSON.stringify(params)}).then((response) => {
      if (response.jsonResult.returnCode === '1') {
        let chanpin=response.jsonResult;
        dispatch(receiveUpdateProduct(chanpin));
        cb && cb()
      } else {
        dispatch(updateProductError(response.jsonResult.error_message));
        message.error(response.jsonResult.error_message);
      }
    });
  };
}



