import { all } from "redux-saga/effects";
import * as Device from "../../Pages/Home/store/saga";
// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
  yield all([Device.myDevice()]);
}
