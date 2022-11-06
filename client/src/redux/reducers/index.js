import { combineReducers } from "redux";
import deviceReducers from "../../Pages/Home/store/reducer"
export default function createReducer(){
    const rootReducer = combineReducers({
      deviceReducers
    })
    return rootReducer;
}
