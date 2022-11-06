import "./index.css";
import { PoweroffOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { AuthContext } from "../../Auth/context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const {
    authState: { user },
    logoutUser,
  } = useContext(AuthContext);

  const logout = () => logoutUser();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light header">
      <div className="header-title">
        <h3>
          Ứng dụng quản lí thông tin thiết bị với công nghệ RFID trên hệ thống
          MongoDB
        </h3>
        <h4>Giảng viên hướng dẫn: Ths.Trương Bá Phúc</h4>
      </div>

      <Button type="primary" icon={<PoweroffOutlined />} onClick={logout} className="header-btn">
        {user?.username}
      </Button>
    </nav>
  );
};

export default Header;
