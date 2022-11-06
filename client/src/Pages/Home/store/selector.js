import { createSelector } from "reselect";
import { INIT_STATE_DEVICE } from "./state";

const selectMyDevice = (state) => state.deviceReducers || INIT_STATE_DEVICE;

const selectLoading = createSelector(selectMyDevice, (state) => state.isLoading);
const selectDevice = createSelector(selectMyDevice, (state)=> state.devices);
const selectDetail = createSelector(selectMyDevice, (state)=> state.detail)
export{selectLoading, selectDevice, selectDetail}