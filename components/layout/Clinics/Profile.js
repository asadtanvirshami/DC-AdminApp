import React,{memo} from "react";

import { Image } from "antd";
import { Col, Row } from "react-bootstrap";

const Profile = ({ data }) => {
  return (
    <div className="border shadow rounded m-5 p-5">
      <Row>
        <h3>Clinic Info</h3>
        <Col>
          <ul className="profile-details px-1 mt-3 ">
            <li className="d-flex">
              <strong>ID:</strong>
              <p className="mx-2">{data.id || "No id"}</p>
            </li>
            <li className="d-flex">
              <strong>Name:</strong>
              <p className="mx-2">{data.name || "No clinic name"}</p>
            </li>
            <li className="d-flex">
              <strong>Email:</strong>
              <p className="mx-2">{data.email || "No clinic email"}</p>
            </li>
            <li className="d-flex">
              <strong>Doctor ID:</strong>
              <p className="mx-2 mb-2">{data.DoctorId || "No doctor id"}</p>
            </li>
            <strong>Clinic Images:</strong>
            <div className="mt-3">
              {data.images.map((img, i) => {
                return <Image height={100} width={100} key={i} src={img} />;
              })}
            </div>
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default memo(Profile);
