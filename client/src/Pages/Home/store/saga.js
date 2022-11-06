import { takeLatest, put, call, all } from "redux-saga/effects";
import {
  GET_DEVICE,
  CREATE_DEVICE,
  UPDATE_DEVICE,
  DEL_DEVICE,
  GET_DETAIL_DEVICE,
  GET_RFID
} from "./contants";
import {
  getDevices,
  createDevice,
  getDetailDevice,
  updateDevice,
  delDevice,
} from "../../../api";
import { saveDevice, setLoading, saveDetail } from "./action";

function* getDeviceSaga({ payload }) {
  try {
    yield put(setLoading(true));
    const response = yield call(getDevices, payload);
    yield all([put(setLoading(false)), put(saveDevice(response))]);
  } catch (e) {
    yield put(setLoading(false));
  }
}

function* createDeviceSaga({ payload, resolve }) {
  try {
    yield put(setLoading(true));
    const response = yield call(createDevice, payload);
    resolve(response.data);
    yield all([put(setLoading(false)), put(saveDevice(response))]);
  } catch (e) {
    yield put(setLoading(false));
  }
}

function* getDetailDeviceSaga({ payload, resolve }) {
  try {
    yield put(setLoading(true));
    const response = yield call(getDetailDevice, payload);
    resolve(response.data);
    yield all([
      put(setLoading(false)),
      put(saveDetail(response.data.device[0])),
    ]);
  } catch (e) {
    yield put(setLoading(false));
  }
}

function* updateDeviceSaga({ payload, resolve }) {
  try {
    yield put(setLoading(true));
    const response = yield call(updateDevice, payload);
    resolve(response.data);
  } catch (e) {
    yield put(setLoading(false));
  }
}
function* deleteDeviceSaga({ payload, resolve }) {
    try {
      yield put(setLoading(true));
      const response = yield call(delDevice, payload);
      resolve(response.data);
      yield put(setLoading(false));
    } catch (e) {
      yield put(setLoading(false));
    }
  }

export function* myDevice() {
  yield takeLatest(GET_DEVICE, getDeviceSaga);
  yield takeLatest(CREATE_DEVICE, createDeviceSaga);
  yield takeLatest(UPDATE_DEVICE, updateDeviceSaga);
  yield takeLatest(DEL_DEVICE, deleteDeviceSaga);
  yield takeLatest(GET_DETAIL_DEVICE, getDetailDeviceSaga);
}
