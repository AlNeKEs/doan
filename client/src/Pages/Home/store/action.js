import {
  SET_LOADING,
  GET_DEVICE,
  SAVE_DEVICE,
  UPDATE_DEVICE,
  DEL_DEVICE,
  CREATE_DEVICE,
  GET_DETAIL_DEVICE,
  SAVE_DETAIL,
  GET_RFID
} from "./contants";
export const setLoading = (payload) => {
  return {
    type: SET_LOADING,
    payload,
  };
};

export const getDevices = (payload) => {
  return {
    type: GET_DEVICE,
    payload,
  };
};

export const createDevice = (payload, resolve) => {
  return {
    type: CREATE_DEVICE,
    payload,
    resolve
  };
};

export function asyncCreateDeviceAction(dispatch) {
  return function returnAsync(payload) {
      return new Promise((resolve) =>
          dispatch(createDevice(payload, resolve))
      );
  };
}

export const saveDevice = (payload) => {
  return {
    type: SAVE_DEVICE,
    payload,
  };
};

export const getDetailDevice = (payload, resolve) => {
  return {
    type: GET_DETAIL_DEVICE,
    payload,
    resolve
  };
};

export function asyncGetDetailAction(dispatch) {
  return function returnAsync(payload) {
      return new Promise((resolve) =>
          dispatch(getDetailDevice(payload, resolve))
      );
  };
}

export const saveDetail = (payload) => {
  return {
    type: SAVE_DETAIL,
    payload,
  };
};

export const updateDevice = (payload, resolve) => {
  return {
    type: UPDATE_DEVICE,
    payload,
    resolve
  };
};

export function asyncUpdateAction(dispatch) {
  return function returnAsync(payload) {
      return new Promise((resolve) =>
          dispatch(updateDevice(payload, resolve))
      );
  };
}

export const delDevice = (payload, resolve) => {
  return {
    type: DEL_DEVICE,
    payload,
    resolve
  };
};

export function asyncDeleteAction(dispatch) {
  return function returnAsync(payload) {
      return new Promise((resolve) =>
          dispatch(delDevice(payload, resolve))
      );
  };
}

