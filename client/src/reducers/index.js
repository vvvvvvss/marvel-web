import { combineReducers } from "redux";
import auth from './auth.js';
import stuDashboard from "./stuDashboard.js";

const reducer = combineReducers({auth, stuDashboard});

export default reducer;