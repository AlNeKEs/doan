import { INIT_STATE_DEVICE } from "./state";
import { produce } from "immer";
import { SET_LOADING, SAVE_DEVICE } from "./contants";

export default function deviceReducers(state = INIT_STATE_DEVICE, action) {
  return produce(state, (draf) => {
    switch (action.type) {
      case SET_LOADING:
        draf.isLoading = action.payload;
        break;
      case SAVE_DEVICE:
        draf.devices = action.payload.data.devices
        break;
      default:
        return state;
    }
  });
}
