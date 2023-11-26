import React, { memo, useEffect, useState } from "react";
import axios from "axios";

import CardMD from "@/components/shared/Card/CardMd";
import PrimaryModal from "@/components/shared/Modal";
import { Row, Col, Spinner } from "react-bootstrap";
import { Input } from "antd";

const Administration = ({ admins }) => {
  const [data, setData] = useState([]);
  const [state, setState] = useState({
    loading: false,
    open: false,
    username: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    setData(admins);
  }, []);

  const onChange = (value, name) => {
    setState((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    setState((prevData) => ({
      ...prevData,
      loading: true,
    }));
    axios
      .post(process.env.NEXT_PUBLIC_CREATE_ADMIN, {
        name: state.name,
        username: state.username,
        password: state.password,
      })
      .then((r) => {
        let tempData = [...admins]
        if (r.data.status === "success") {
          setState({
            name: "",
            password: "",
            username: "",
            loading: false,
          });
          tempData.push(r.data.admin)
          setData(tempData)
        } else {
          setState({
            name: "",
            password: "",
            username: "",
            loading: false,
            open: false,
          });
        }
        if (state.loading === false) {
          setState((prevData) => ({
            ...prevData,
            open: false,
          }));
        }
      });
  };

  return (
    <React.Fragment>
      <div className="administration-container border shadow rounded m-5 p-5">
        <div className="d-flex">
          <h3 className="">Accessibility and Authorization</h3>
          <button
            onClick={() => {
              setState((prevData) => ({
                ...prevData,
                open: true,
              }));
            }}
            className="btn-orange-light mx-4"
          >
            Add New
          </button>
        </div>
        <Row className="d-flex justify-content-center">
          <Col className="mt-3">
            <Row>
              {data.map((item, i) => {
                return (
                  <Col key={i} md={3}>
                    <CardMD
                      title={`${item.username} (${item.name})`}
                      description={item.password}
                    />
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </div>

      <PrimaryModal
        open={state.open}
        setOpen={(updatedData) =>
          setState((prevData) => ({
            ...prevData,
            open: updatedData,
          }))
        }
      >
        <form className="create-admin-form" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <h4 className="mb-4">Create Administrator</h4>
          </div>
          <ul>
            <li>
              <h6>Username:</h6>
            </li>
            <li>
              <Input
                value={state.username}
                name="username"
                className="rounded custom-focus"
                placeholder="1JohnDoe"
                size="large"
                onChange={(e) => onChange(e.target.value, e.target.name)}
              />
            </li>
            <li>
              <h6>Name:</h6>
            </li>
            <li>
              <Input
                value={state.name}
                name="name"
                className="rounded custom-focus"
                placeholder="John Doe"
                size="large"
                onChange={(e) => onChange(e.target.value, e.target.name)}
              />
            </li>
            <li>
              <h6>Password:</h6>
            </li>
            <li>
              <Input
                value={state.password}
                name="password"
                className="rounded custom-focus"
                placeholder="xyzadmin123"
                size="large"
                onChange={(e) => onChange(e.target.value, e.target.name)}
              />
            </li>
            <hr className="mt-5" />
          </ul>
          <div className="m-4">
            <button
              disabled={state.loading ? true : false}
              type="submit"
              className="btn-orange-light"
            >
              {state.loading ? <Spinner size="sm" /> : "Submit"}
            </button>
          </div>
        </form>
      </PrimaryModal>
    </React.Fragment>
  );
};

export default memo(Administration);
