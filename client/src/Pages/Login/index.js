import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useState, useContext } from "react";
import { AuthContext } from "../../Auth/context/AuthContext";
import "./index.css";
const Login = () => {
  //context
  const { loginUser } = useContext(AuthContext);

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });
  const onChangeValue = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      if (loginData.success) {
        //navigate('/dashboard');
        console.log(loginData);
      } else {
        setAlert({ type: "danger", message: loginData.message });
        setTimeout(() => {
          setAlert({ type: "", message: "" });
        }, 3000);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="login-page">
      <Alert variant={alert.type} className="login-noti">
        <Alert.Heading>{alert.message}</Alert.Heading>
      </Alert>
      <div className="login-form">
        <div className="login-form-intro">
          <div>
            <h2>ĐỒ ÁN TỐT NGHIỆP</h2>
            <h3 >
              Ứng dụng quản lí thông tin thiết bị với công nghệ RFID trên hệ
              thống MongoDB
            </h3>
          </div>
        </div>
        <div className=" login-form-panel">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Logo_IUH.png/800px-Logo_IUH.png"
            alt="IUH logo"
          ></img>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value = {loginForm.username}
                onChange={onChangeValue}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password: </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value = {loginForm.password}
                onChange={onChangeValue}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
