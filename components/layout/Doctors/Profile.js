import React, { useState } from "react";

import { Col, Row } from "react-bootstrap";
import PrimaryModal from "@/components/shared/Modal";
import { Avatar } from "antd";

const Profile = ({ data }) => {
  const [state, setState] = useState({ value: "", open: false });
  return (
    <>
      <div className="profile-container border rounded shadow m-5 p-5">
        <h3>Doctor Details</h3>
        <div className="mt-4 d-flex">
          <Avatar size={35}>{data.firstName?.charAt(0).toUpperCase()}</Avatar>
          <h5 className="mx-3 mt-1">
            {data.firstName || "No first name"}{" "}
            {data.lastName || "No last name"}
          </h5>
        </div>
        <hr className="mt-3" />
        <Row className="m-auto justify-content-center  ">
          <Col md={4} className="p-4 border rounded">
            <ul className="profile-details px-1 mt-3 ">
              <li className="d-flex">
                <strong>First name:</strong>
                <p className="mx-2">{data.firstName || "No first name"}</p>
              </li>
              <li className="d-flex">
                <strong>Last name:</strong>
                <p className="mx-2">{data.lastName || "No last name"}</p>
              </li>
              <li className="d-flex">
                <strong>Bio:</strong>
                <button
                  className="btn-orange-special rounded mx-2 mb-2"
                  onClick={() => {
                    setState({
                      value: data.bio || "No bio",
                      open: true,
                    });
                  }}
                >{`View bio`}</button>
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
            <ul className="profile-details px-1 mt-3 ">
              <li className="d-flex">
                <strong>Address 01:</strong>
                <p className="mx-2">{data.address1 || "No address 1"}</p>
              </li>
              <li className="d-flex">
                <strong>Address 02:</strong>
                <p className="mx-2">{data.address2 || "No address 2"}</p>
              </li>
              <li className="d-flex">
                <strong>Postal:</strong>
                <p className="mx-2">{data.postal || "No postal code"}</p>
              </li>
              <li className="d-flex">
                <strong>Country:</strong>
                <p className="mx-2">{data.country || "No country"}</p>
              </li>
              <li className="d-flex">
                <strong>City:</strong>
                <p className="mx-2">{data.city || "No city"}</p>
              </li>
            </ul>
          </Col>
          <Col md={4} className="p-4 border rounded">
            <ul className="profile-details px-1 mt-3 ">
              <li className="d-flex">
                <strong>Approved:</strong>
                <p className="mx-2">{data.approved || "Not approved"}</p>
              </li>
              <li className="d-flex">
                <strong>Verified:</strong>
                <p className="mx-2">{data.verified || "Not verified"}</p>
              </li>
              <li className="d-flex">
                <strong>Gmail:</strong>
                <p className="mx-2">{data.gmail || "No gmail"}</p>
              </li>
              <li className="d-flex">
                <strong>Gmail ID:</strong>
                <p className="mx-2">{data.gmailId || "No gmail Id"}</p>
              </li>
              <li className="d-flex">
                <strong>Apple:</strong>
                <p className="mx-2">{data.apple || "No gmail"}</p>
              </li>
              <li className="d-flex">
                <strong>Apple ID:</strong>
                <p className="mx-2">{data.appleId || "No gmail Id"}</p>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="m-5 justify-content-center  border rounded p-4">
          <Col>
            <h4>Doctor Experiences</h4>
            <hr className="mt-6" />
            {data.Experiences.length > 0 ? (
              <div>
                {data.Experiences.map((ele, i) => {
                  return (
                    <Row key={i}>
                      <Col>
                        <ul className="profile-details px-1 mt-3 ">
                          <li className="d-flex">
                            <strong>Hopital name:</strong>
                            <p className="mx-2">
                              {ele.hospitalName || "No Hospital"}
                            </p>
                            <strong>From:</strong>
                            <p className="mx-2">{ele.from || "No year from"}</p>
                            <strong>To:</strong>
                            <p className="mx-2">{ele.to || "No year from"}</p>
                            <strong>Designation:</strong>
                            <p className="mx-2">
                              {ele.designation || "No year from"}
                            </p>
                          </li>
                        </ul>
                      </Col>
                    </Row>
                  );
                })}
              </div>
            ) : (
              <p>No experiences to show</p>
            )}
          </Col>
          <Col>
            <h4>Doctor Educations</h4>
            <hr className="mt-3" />
            {data.Education.length > 0 ? (
              <div>
                {data.Education.map((ele, i) => {
                  return (
                    <Row key={i}>
                      <Col>
                        <ul className="profile-details px-1 mt-3 ">
                          <li className="d-flex">
                            <strong>Degree:</strong>
                            <p className="mx-2">{ele.degree || "No degree"}</p>
                            <strong>institute:</strong>
                            <p className="mx-2">
                              {ele.institute || "No institute"}
                            </p>
                            <strong>Year:</strong>
                            <p className="mx-2">{ele.year || "No year"}</p>
                          </li>
                        </ul>
                      </Col>
                    </Row>
                  );
                })}
              </div>
            ) : (
              <p>No education to show</p>
            )}
          </Col>
        </Row>
        <Row className="m-5 justify-content-center  border rounded p-4">
          <Col md={6}>
            <h4>Doctor Specializations</h4>
            <hr className="mt-6" />
            {data.Specializations.length > 0 ? (
              <div>
                {data.Specializations.map((ele, i) => {
                  return (
                    <Row key={i}>
                      <Col>
                        <ul className="profile-details px-1 mt-3 ">
                          <li className="d-flex">
                            <strong>Specialization name:</strong>
                            <p className="mx-2">
                              {ele.name || "No specialization name"}
                            </p>
                          </li>
                        </ul>
                      </Col>
                    </Row>
                  );
                })}
              </div>
            ) : (
              <p>No specializations to show</p>
            )}
          </Col>
          <Col md={6}>
            <h4>Doctor Services</h4>
            <hr className="mt-3" />
            {data.Services.length > 0 ? (
              <div>
                {data.Services.map((ele, i) => {
                  return (
                    <Row key={i}>
                      <Col>
                        <ul className="profile-details px-1 mt-3 ">
                          <li className="d-flex">
                            <strong>Service name:</strong>
                            <p className="mx-2">
                              {ele.name || "No service name"}
                            </p>
                          </li>
                        </ul>
                      </Col>
                    </Row>
                  );
                })}
              </div>
            ) : (
              <p>No services to show</p>
            )}
          </Col>
        </Row>
        <Row className="m-5 justify-content-center  border rounded p-4">
          <Col md={6}>
            <h4>Doctor Pricings</h4>
            <hr className="mt-3" />
            {data.Pricings.length > 0 ? (
              <div>
                {data.Pricings.map((ele, i) => {
                  return (
                    <Row key={i}>
                      <Col>
                        <ul className="profile-details px-1 mt-3 ">
                          <li className="d-flex">
                            <strong>Name:</strong>
                            <p className="mx-2">{ele.name || "No name"}</p>
                            <strong>Prices:</strong>
                            <p className="mx-2">{ele.price || "No price"}</p>
                          </li>
                        </ul>
                      </Col>
                    </Row>
                  );
                })}
              </div>
            ) : (
              <p>No pricings to show</p>
            )}
          </Col>
          <Col md={6}>
            <h4>Doctor Clinics</h4>
            <hr className="mt-3" />
            {data.Clinics.length > 0 ? (
              <div>
                {data.Clinics.map((ele, i) => {
                  return (
                    <Row key={i}>
                      <Col>
                        <ul className="profile-details px-1 mt-3 ">
                          <li className="d-flex">
                            <strong>clinic name:</strong>
                            <p className="mx-2">
                              {ele.name || "No clinic name"}
                            </p>
                          </li>
                        </ul>
                      </Col>
                    </Row>
                  );
                })}
              </div>
            ) : (
              <p>No clinics to show</p>
            )}
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
        <div className="p-3">{state.value}</div>
      </PrimaryModal>
    </>
  );
};

export default Profile;
