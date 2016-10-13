import {
  PRODUCTS_QERUEST, PRODUCTS_SUCCESS, PRODUCTS_FAILURE,
  CREATE_PRODUCT_QERUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAILURE,
} from './../constants/actionTypes';
import cFetch from './../utils/cFetch';
import cookie from 'js-cookie';
import { API_CONFIG } from './../config/api';
import { message } from 'antd';

function requestProducts() {
  return {
    type: PRODUCTS_QERUEST,
    isFetching: true
  };
}

function receiveProducts(products) {
  return {
    type: PRODUCTS_SUCCESS,
    isFetching: false,
    products
  };
}

function productsError(message) {
  return {
    type: PRODUCTS_FAILURE,
    isFetching: false,
    message
  };
}

export function queryProducts(params) {
  return dispatch => {
    dispatch(requestProducts());
    return cFetch(API_CONFIG.products, { method: "POST", body: JSON.stringify(params) }).then((response) => {
      console.log(response.jsonResult);
      if (response.jsonResult.returnCode === '1') {
        dispatch(receiveProducts(response.jsonResult));
      } else {
        dispatch(productsError(response.jsonResult.error_message));
        message.error(response.jsonResult.error_message);
      }
    });
  };
}

export function createProduct(params, cb) {
  return () => {
    return cFetch(API_CONFIG.createProduct, { method: "POST", body: JSON.stringify(params) }).then((response) => {
      if (response.jsonResult.returnCode === '1') {
        cb(response.jsonResult.msg);
      } else {
        message.error(response.jsonResult.msg);
      }
    });
  };
}
