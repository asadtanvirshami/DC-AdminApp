import React,{memo} from "react";

import { Input } from "antd";
import { Spinner } from "react-bootstrap";

const ResetCredentials = ({state, onChange, handleSubmit}) => {
  return (
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
  );
};

export default memo(ResetCredentials);
