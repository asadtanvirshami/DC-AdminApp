import React, { memo, useState, useEffect } from "react";
import { useUser } from "../User/UserProvider";
import axios from "axios";

import { Col, Row } from "react-bootstrap";
import PrimaryModal from "@/components/shared/Modal";
import { Input } from "antd";

const Settings = ({ sessionData }) => {
  const { user } = useUser();

  const [isClient, setIsClient] = useState(false);

  const [state, setState] = useState({
    open: false,
    error: false,
    loading: false,
    value: "",
    username: "",
    name: "",
    password: "",
    title: "",
    note: "",
    message: "",
  });

  useEffect(() => {
    if (sessionData.isAuthorized) {
      setIsClient(true);
    } else {
      router.push("/");
    }
  }, []);

  const handleSubmit = () => {
    axios
      .post(process.env.NEXT_PUBLIC_ADMIN_RESET, {
        id: user.loginId,
        name: user.name,
        username: user.username,
      })
      .then((r) => {
        console.log(r.data);
      });
  };
  console.log(state)
  return (
    <>
      {isClient ? (
        <div className="settings-container border shadow rounded m-5 p-5">
          <h3>Settings </h3>
          <Row>
            <Col md={8} className="mt-3">
              <div className="d-flex ">
                <strong>Name:</strong>
                <p className="mx-2">{user?.name}</p>
              </div>
              <div className="d-flex ">
                <strong>Username:</strong>
                <p className="mx-2">{user?.username}</p>
              </div>
            </Col>
            <Col md={4} className="mt-3">
              <div className="">
                <ul>
                  <li
                    onClick={() => {
                      setState({
                        title: "Privacy & Security",
                        note: "Please enter new name.",
                        value: "name",
                        open: true,
                      });
                    }}
                  >
                    reset name
                  </li>
                  <li
                    onClick={() => {
                      setState({
                        title: "Privacy & Security",
                        note: "Please enter new username.",
                        value: "username",
                        open: true,
                      });
                    }}
                  >
                    reset username
                  </li>
                  <li
                    onClick={() => {
                      setState({
                        title: "Privacy & Security",
                        note: "Please enter new password.",
                        value: "password",
                        open: true,
                      });
                    }}
                  >
                    reset password
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      ) : (
        <></>
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
            value={state.value}
              onChange={(e) =>
                setState((prevData) => ({
                  ...prevData,
                  [state.value]: e.target.value,
                }))
              }
              size="md"
            />
            <button className="btn-orange-light mt-3">Save</button>
          </div>
          <small></small>
        </div>
      </PrimaryModal>
    </>
  );
};

export default memo(Settings);
