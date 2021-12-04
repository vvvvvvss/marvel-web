import { combineReducers } from "redux";
import auth from './auth.js';
import dashboard from "./dashboard.js";
import other from './other.js';

const reducer = combineReducers({auth, dashboard, other});

export default reducer;