import React,{memo} from "react";

import { Avatar } from "antd";
import { Col, Row } from "react-bootstrap";

const Profile = ({ data }) => {
  console.log(data);
  return (
    <div className="profile-container border rounded shadow m-5 p-5">
      <h3>Doctor Details</h3>
      <div className="mt-4 d-flex">
        <Avatar size={35}>{data.firstName?.charAt(0).toUpperCase()}</Avatar>
        <h5 className="mx-3 mt-1">
          {data.firstName || "No first name"} {data.lastName || "No last name"}
        </h5>
      </div>
      <hr className="mt-3" />
      <Row className="m-auto justify-content-center  ">
        <Col md={4} className="p-4 border rounded">
          <h5>Personal Info</h5>
          <ul className="profile-details px-1 mt-3 ">
            <li className="d-flex">
              <strong>ID:</strong>
              <p className="mx-2">{data.id || "No id"}</p>
            </li>
            <li className="d-flex">
              <strong>First name:</strong>
              <p className="mx-2">{data.firstName || "No first name"}</p>
            </li>
            <li className="d-flex">
              <strong>Last name:</strong>
              <p className="mx-2">{data.lastName || "No last name"}</p>
            </li>
            <li className="d-flex">
              <strong>Password:</strong>
              <p className="mx-2 mb-2">{data.password || "No password"}</p>
            </li>
            <li className="d-flex">
              <strong>Email:</strong>
              <p className="mx-2">{data.email || "No email"}</p>
            </li>
            <li className="d-flex">
              <strong>Phone no:</strong>
              <p className="mx-2">{data.phone || "No phone number"}</p>
            </li>
            <li className="d-flex">
              <strong>D.O.B:</strong>
              <p className="mx-2">{data.dob || "No date of birth"}</p>
            </li>
            <li className="d-flex">
              <strong>Gender:</strong>
              <p className="mx-2">{data.gender || "No gender"}</p>
            </li>
          </ul>
        </Col>
        <Col md={3} className="p-4 mx-4 border rounded">
          <h5>Body & Family</h5>
          <ul className="profile-details px-1 mt-3 ">
            <li className="d-flex">
              <strong>Height:</strong>
              <p className="mx-2">{data.height || "No height"}</p>
            </li>
            <li className="d-flex">
              <strong>Weight:</strong>
              <p className="mx-2">{data.weight || "No weight"}</p>
            </li>
            <li className="d-flex">
              <strong>Approved:</strong>
              <p className="mx-2">{data.approved || "0"}</p>
            </li>
            <li className="d-flex">
              <strong>Married:</strong>
              <p className="mx-2">{data.married || "0"}</p>
            </li>
            <li className="d-flex">
              <strong>Children:</strong>
              <p className="mx-2">{data.children || "0"}</p>
            </li>
          </ul>
        </Col>
        <Col md={4} className="p-4 border rounded">
          <h5>Addictions</h5>
          <ul className="profile-details px-1 mt-3 ">
            <li className="d-flex">
              <strong>Smoke:</strong>
              <p className="mx-2">{data.smoke || "0"}</p>
            </li>
            <li className="d-flex">
              <strong>Tobacco:</strong>
              <p className="mx-2">{data.tobacco || "0"}</p>
            </li>
            <li className="d-flex">
              <strong>Alcohol:</strong>
              <p className="mx-2">{data.alcohol || "0"}</p>
            </li>
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default memo(Profile);
