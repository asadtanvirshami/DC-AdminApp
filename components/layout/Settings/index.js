import React, { memo, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

import { useUser } from "../User/UserProvider";

import { Col, Row, Divider } from "antd";
import CardMD from "@/components/shared/Card/CardMd";
import PrimaryModal from "@/components/shared/Modal";
import ResetCredentials from "./resetCredentials";

const Settings = ({ sessionData }) => {
  const { user } = useUser();
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();

  const [state, setState] = useState({
    open: false,
    error: false,
    loading: false,
    value: "",
    username: "",
    name: "",
    password: "",
    title: "",
    status: "",
    message: "",
  });

  useEffect(() => {
    const { isAuthorized } = sessionData;
    if (isAuthorized) {
      setIsClient(true);
      setState((prevData) => ({
        ...prevData,
        name: user.name,
        username: user.username,
        password: user.password,
      }));
    } else {
      router.push("/");
    }
  }, [sessionData]);

  const handleReset = (value) => {
    setState((prevData) => ({
      ...prevData,
      title: "Privacy & Security",
      note: `Please enter new ${value}.`,
      value,
      open: true,
    }));
  };

  const handleSubmit = () => {
    setState((prevData) => ({
      ...prevData,
      loading: true,
    }));
    axios
      .post(process.env.NEXT_PUBLIC_ADMIN_RESET, {
        id: user.loginId,
        name: state.name,
        username: state.username,
        password: state.password || "",
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "success") {
          Cookies.set("user", JSON.stringify(res.data.payload), { expires: 1 });
          setState((prevData) => ({
            ...prevData,
            loading: false,
            message: "Credentials updated",
            status: "success",
          }));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setState((prevData) => ({
          ...prevData,
          loading: false,
          message: "Credentials not updated",
          status: "error",
        }));
      });
  };

  const onChange = (value, name) => {
    setState((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      {isClient && (
        <div className="settings-container border shadow rounded m-5 p-5">
          <h3>Settings </h3>
          <Row className="mt-3">
            <Col flex={5}>
              <div className="d-flex ">
                <strong>ID:</strong>
                <p className="mx-2">{user?.loginId}</p>
              </div>
              <div className="d-flex ">
                <strong>Name:</strong>
                <p className="mx-2">{user?.name}</p>
              </div>
              <div className="d-flex ">
                <strong>Username:</strong>
                <p className="mx-2">{user?.username}</p>
              </div>
            </Col>
            <Col flex={1} className="">
              <div className="">
                <ul>
                  <li onClick={() => handleReset("name")}>reset name</li>
                  <li onClick={() => handleReset("username")}>
                    reset username
                  </li>
                  <li onClick={() => handleReset("password")}>
                    reset password
                  </li>
                </ul>
              </div>
            </Col>
            <Divider />
            <Col className="mt-3">
              <div className="d-flex">
                <h3 className="">Accessibility and Authorization</h3>
                <button className="btn-orange-light mx-4">Add New</button>
              </div>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={6}>
                  <CardMD title={"Admin"} description={"Description"} />
                </Col>
                <Col className="gutter-row" span={6}>
                  <CardMD title={"Admin"} description={"Description"} />
                </Col>
                <Col className="gutter-row" span={6}>
                  <CardMD title={"Admin"} description={"Description"} />
                </Col>
                <Col className="gutter-row" span={6}>
                  <CardMD title={"Admin"} description={"Description"} />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      )}
      <PrimaryModal
        open={state.open}
        setOpen={(updatedData) =>
          setState((prevData) => ({
            ...prevData,
            open: updatedData,
          }))
        }
      >
        <React.Fragment>
          <ResetCredentials
            onChange={onChange}
            handleSubmit={handleSubmit}
            state={state}
          />
        </React.Fragment>
      </PrimaryModal>
    </>
  );
};

export default memo(Settings);
