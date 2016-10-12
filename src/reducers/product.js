import {
  PRODUCT_QERUEST, PRODUCT_SUCCESS, PRODUCT_FAILURE
} from './../constants/actionTypes';
import initialState from './initialState';

export default function product(state = initialState.product, action) {
  switch (action.type) {
    case PRODUCT_QERUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case PRODUCT_SUCCESS:
      return Object.assign({}, {
        isFetching: false,
        errorMessage: '',
        data: action.product.data
      });
    case PRODUCT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      });
    default:
      return state;
  }
}
