import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth';
import users from './users';
import user from './user';
import products from './products';
import product from './product';
import res from './res';
import sysRes from './sysRes';
import systemUsers from './systemUsers';

const rootReducer = combineReducers({
  routing: routerReducer,
  auth,
  users,
  products,
  product,
  res,
  sysRes,
  systemUsers,
  user
});

export default rootReducer;
