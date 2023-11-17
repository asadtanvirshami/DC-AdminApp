import React, { memo, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

import { useUser } from "../User/UserProvider";

import { Col, Row, Spinner } from "react-bootstrap";
import PrimaryModal from "@/components/shared/Modal";
import { Input } from "antd";

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
          <Row>
            <Col md={8} className="mt-3">
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
            <Col md={3} className="mt-3">
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
        <div>
          <h5>{state.title}</h5>
          <div className="mt-2">
            <p>{state.note}</p>
            <Input
              value={state[state.value]}
              name={state.value}
              onChange={(e) => onChange(e.target.value, e.target.name)}
              size="md"
            />
            <button className="btn-orange-light mt-3" onClick={handleSubmit}>
              {state.loading ? <Spinner size="sm" /> : "Save"}
            </button>
          </div>
          <small
            style={
              state.status === "success" ? { color: "green" } : { color: "red" }
            }
          >
            {state.status === "success" && state.message}
          </small>
        </div>
      </PrimaryModal>
    </>
  );
};

export default memo(Settings);
