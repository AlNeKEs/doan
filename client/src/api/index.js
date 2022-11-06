import axios from "axios";
//user
export const authLogin = (payload) =>
  axios.post(`${process.env.REACT_APP_API}/api/auth/login`, payload);
export const authUser = () =>
  axios.get(`${process.env.REACT_APP_API}/api/auth`);

//device
export const getDevices = (payload) =>
  axios.post(`${process.env.REACT_APP_API}/api/device/getDevice`, payload);
export const createDevice = (payload) =>
  axios.post(`${process.env.REACT_APP_API}/api/device/add`, payload);
export const updateDevice = (payload) =>
  axios.put(`${process.env.REACT_APP_API}/api/device/update`, payload);
export const delDevice = (deviceID) =>
  axios.delete(`${process.env.REACT_APP_API}/api/device/delete/${deviceID}`);
export const getDetailDevice = (deviceID) =>
  axios.get(`${process.env.REACT_APP_API}/api/device/getDetail/${deviceID}`);
