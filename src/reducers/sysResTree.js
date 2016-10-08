/**
 * Created by lirui on 2016/9/21.
 */
import {
  TREE_SYS_RES_REQUEST,TREE_SYS_RES_SUCCESS,TREE_SYS_RES_FAIL
} from './../constants/actionTypes';
import initialState from './initialState';

export default function sysResTree(state = initialState.sysResTree, action) {

  switch (action.type) {
    case TREE_SYS_RES_SUCCESS:
      return Object.assign({}, {
        isFetching: false,
        errorMessage: '',
        data: action.sysResTree.data.subRes
      });
    default:
      return state;
  }
}
