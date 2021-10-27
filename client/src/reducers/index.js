import { combineReducers } from "redux";
import auth from './auth.js';
import dashboard from "./dashboard.js";

const reducer = combineReducers({auth, dashboard});

export default reducer;