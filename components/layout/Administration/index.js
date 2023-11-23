import React, { memo, useEffect, useState } from "react";

import CardMD from "@/components/shared/Card/CardMd";
import { Row, Col } from "react-bootstrap";
import PrimaryModal from "@/components/shared/Modal";

const Administration = () => {
  const [data, setData] = useState([]);
  const [state, setState] = useState({ loading: false, open: false });

  useEffect(() => {}, []);

  const handleSubmit = () => {};

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
              <Col md={3}>
                <CardMD title={"Admin"} description={"Description"} />
              </Col>
              <Col md={3}>
                <CardMD title={"Admin"} description={"Description"} />
              </Col>
              <Col md={3}>
                <CardMD title={"Admin"} description={"Description"} />
              </Col>
              <Col md={3}>
                <CardMD title={"Admin"} description={"Description"} />
              </Col>
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
      ></PrimaryModal>
    </React.Fragment>
  );
};

export default memo(Administration);
