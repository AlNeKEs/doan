import { createContext, useReducer, useEffect } from "react";
import { authReducer } from "../reducers/authReducers";
import { authLogin, authUser } from "../../api/index";
import { setAuthToken, getCookie } from "../../utils/index";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });
    
  //Authenticate user
  const loadUser = async () => {
    const token = getCookie('token');
    if (token) {
      setAuthToken(token);
    }
    try {
      const response = await authUser();
      console.log(response);
      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: {
            isAuthenticated: true,
            user: response.data.user,
          },
        });
      }
      else{
        console.log(response)
      }
    } catch (e) {
      console.log(e)
      document.cookie = `token = `;
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    };
  }
  useEffect( ()=>{
  loadUser();
}, []);

  //Login
  const loginUser = async (userForm) => {
    try {
      const response = await authLogin(userForm);
      if (response.data.success) {
        document.cookie = `token = ${response.data.accessToken}`;
        dispatch({
          type: "SET_AUTH",
          payload: {
            isAuthenticated: true,
            user: response.data.user,
          },
        });
        console.log(dispatch.payload.user);
        return response.data;
      }else{
        console.log(response)
      }
    } catch (err) {
      if (err.response.data) return err.response.data;
      else return { success: false, message: err.message };
    }
  };

  //Logout
  const logoutUser = () =>{
    document.cookie = `token = `;
    dispatch({
      type: "SET_AUTH",
      payload: {
        isAuthenticated: false,
        user: {},
      },
    });
  }
  //Context data
  const authContextData = {loginUser,loadUser,logoutUser, authState}

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
