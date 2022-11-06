import React from "react";
import { Table, Input, Modal, Form, Select, DatePicker } from "antd";
import { useState, useEffect } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import moment from "moment";
import {
  getDevices,
  asyncCreateDeviceAction,
  asyncUpdateAction,
  asyncDeleteAction,
  asyncGetDetailAction,
} from "./store/action";
import { selectLoading, selectDevice, selectDetail } from "./store/selector";
import { createStructuredSelector } from "reselect";
import "./index.css";
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  SmileOutlined,
} from "@ant-design/icons";

import { Space, Button, notification, Checkbox } from "antd";
const Home = (props) => {
  const { getDetail, createDevice, updateDevice, deleteDevice, getRfid } =
    props;
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => {
        return (
          <span>
            {paginatios.paging.pageIndex * paginatios.paging.pageSize +
              index +
              1 -
              paginatios.paging.pageSize}
          </span>
        );
      },
    },
    {
      title: "RFID Tag",
      dataIndex: "rfidId",
      key: "rfidId",
    },
    {
      title: "Device Name",
      dataIndex: "deviceName",
      key: "deviceName",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Model",
      dataIndex: "deviceModel",
      key: "deviceModel",
    },
    {
      title: "Manufactor",
      dataIndex: "manufactor",
      key: "manufactor",
    },
    {
      title: "Manufacturing Date",
      dataIndex: "mfg",
      key: "mfg",
      render: (text, record) =>
        text ? moment(text).format(dateFormat) : "date",
    },
    {
      title: "Expiry date",
      dataIndex: "exp",
      key: "exp",
      render: (text, record) =>
        text ? moment(text).format(dateFormat) : "date",
    },
    {
      title: "Create date",
      dataIndex: "createAt",
      key: "createAt",
      render: (text, record) =>
        text ? moment(text).format(dateFormat) : "date",
    },
    {
      title: "Date Modified",
      dataIndex: "dateModified",
      key: "dateModified",
      render: (text, record) =>
        text ? moment(text).format(dateFormat) : "date",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            style={{ backgroundColor: "RGB(10, 94, 243)", color: "white" }}
            onClick={() => modalUpdate(record._id)}
          >
            <EditOutlined />
          </Button>
          <Button
            style={{ backgroundColor: "RGB(10, 94, 243)", color: "white" }}
            onClick={() => delDevice(record._id)}
          >
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  //search
  const [searchValue, setSearchValue] = useState("");
  const [searchStatus, setSearchStatus] = useState(false);
  const handleChangeSearch = (e) => {
    setSearchValue(e.target.value);
  };
  const handleSearch = (e) => {
    setSearchStatus(!searchStatus);
  };

  // create and update
  //modal
  const dateFormat = "DD/MM/YYYY";
  const [open, setOpen] = useState(false);
  const { Option } = Select;
  const [isSubmit, setSubmit] = useState(false);
  const [formModal] = Form.useForm();
  const [createBtn, setCreateBtn] = useState(true);
  const showModal = () => {
    setOpen(true);
    formModal.resetFields();
    setCreateBtn(true);
  };
  const handleCancel = () => {
    setOpen(false);
    setCreateBtn(true);
  };

  //load data to modal update
  const modalUpdate = async (id) => {
    console.log(id);
    setCreateBtn(false);
    setOpen(true);
    const response = await getDetail(id);
    if (response.success) {
      formModal.setFieldsValue({
        id: id,
        rfidId: response.device[0].rfidId,
        deviceName: response.device[0].deviceName,
        type: response.device[0].type,
        deviceModel: response.device[0].deviceModel,
        manufactor: response.device[0].manufactor,
        exp: moment(response.device[0].exp),
        mfg: moment(response.device[0].mfg),
      });
    }
  };

  //submit data create or update
  const onFinish = async (values) => {
    if (!values.id) {
      const params = {
        rfidId: values.rfidId,
        deviceName: values.deviceName,
        type: values.type,
        deviceModel: values.deviceModel,
        manufactor: values.manufactor,
        exp: values.exp,
        mfg: values.mfg,
      };
      const res = await createDevice(params);
      if (res.success) {
        openNotification("Success", "Create Successful !", true);
      } else {
        openNotification("Failed", "Create Failed !", false);
      }
    } else {
      const params = {
        id: values.id,
        rfidId: values.rfidId,
        deviceName: values.deviceName,
        type: values.type,
        deviceModel: values.deviceModel,
        manufactor: values.manufactor,
        exp: values.exp,
        mfg: values.mfg,
      };
      const res = await updateDevice(params);
      if (res.success) {
        openNotification("Success", "Update Successful !", true);
      } else {
        openNotification("Failed", "Update Failed !", false);
      }
    }

    setSubmit(!isSubmit);
    setOpen(false);
  };

  //delete device
  const delDevice = async (id) => {
    const res = await deleteDevice(id);
    console.log(res);
    if (res.success) {
      openNotification("Success", "Delete Successful !", true);
      const params = {
        searchValue: searchValue,
      };
      props.getAllDevices(params);
    } else {
      openNotification("Failed", "Delete Failed !", false);
    }
  };

  //notification
  const openNotification = (title, content, icon) => {
    notification.open({
      message: title,
      description: content,
      icon: icon ? (
        <CheckOutlined style={{ color: "green" }} />
      ) : (
        <SmileOutlined style={{ color: "red" }} />
      ),
    });
  };

  useEffect(() => {
    const params = {
      searchValue: searchValue,
    };
    props.getAllDevices(params);
    console.log(props.devices);
  }, [searchStatus, isSubmit]);

  //pagnigation
  const [paginatios, setPaginatios] = useState({
    paging: { pageIndex: 1, pageSize: 10 },
  });
  const onChange = (pagination, filters, sorter, extra) => {
    const { current, pageSize } = pagination;
    const paging = { pageIndex: current, pageSize };
    const params = { ...paginatios, paging };
    setPaginatios(params);
  };

  return (
    <div>
      <div className="tool" style={{ width: "950px", margin: "5px auto" }}>
        <Input
          placeholder="Search..."
          onChange={handleChangeSearch}
          style={{ width: "300px" }}
        />
        <Button
          style={{ backgroundColor: "#62aeff", color: "white" }}
          onClick={handleSearch}
        >
          Search
        </Button>
        <Button
          style={{ backgroundColor: "#62aeff", color: "white", float: "right" }}
          onClick={showModal}
        >
          Create
        </Button>
      </div>
      <div className="content">
        <Table
          columns={columns}
          dataSource={props.devices}
          loading={props.isLoading}
          onChange={onChange}
        />
      </div>

      {/* modal */}
      <Modal
        title={createBtn ? "Create Device" : "Update Device"}
        open={open}
        onCancel={handleCancel}
        style={{ top: 20 }}
        footer={
          <Button type="primary" htmlType="submit" form="formModal">
            {/* Save */}
            {createBtn ? "Create" : "Update"}
          </Button>
        }
      >
        <Form
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
          form={formModal}
          name="formModal"
        >
          <Form.Item label="Id" name="id">
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="RFID tag"
            name="rfidId"
            rules={[
              { required: true, message: "Please input RFID tag!" },
              { min: 5, message: "Minimum 5 characters" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Device Name"
            name="deviceName"
            rules={[
              { required: true, message: "Please input Device Name!" },
              { min: 5, message: "Minimum 5 characters" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select defaultValue="Điện tử">
              <Option value={"Điện tử"}>Điện tử</Option>
              <Option value={"Điện lạnh"}>Điện lạnh</Option>
              <Option value={"Gia dụng"}>Gia dụng</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Model"
            name="deviceModel"
            rules={[{ required: true, message: "Please input device model!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Manufactor"
            name="manufactor"
            rules={[{ required: true, message: "Please input Manufactor!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Manufacturing Date" name="mfg">
            <DatePicker
              defaultValue={moment("10/10/2022", dateFormat)}
              format={dateFormat}
            />
          </Form.Item>
          <Form.Item label="Expiry Date" name="exp">
            <DatePicker
              defaultValue={moment("10/10/2022", dateFormat)}
              format={dateFormat}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  isLoading: selectLoading,
  devices: selectDevice,
  detail: selectDetail,
});

const mapDispatchToProps = (dispatch) => ({
  getAllDevices: (payload) => dispatch(getDevices(payload)),
  getDetail: (payload) => asyncGetDetailAction(dispatch)(payload),
  createDevice: (payload) => asyncCreateDeviceAction(dispatch)(payload),
  updateDevice: (payload) => asyncUpdateAction(dispatch)(payload),
  deleteDevice: (payload) => asyncDeleteAction(dispatch)(payload),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Home);
