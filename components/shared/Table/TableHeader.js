import React, { useState, useEffect, memo } from "react";

import { Select } from "antd";
import { HiSearch } from "react-icons/hi";
import { HiOutlineFunnel } from "react-icons/hi2";

const TableHeader = ({ length, title, setSearchTerm, keys, data, setData }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (keys) {
      let newArr = [];
      for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        newArr.push({
          label: key,
          value: keys[index],
        });
      }
      if (newArr.length != 0) {
        setOptions(newArr);
      }
    }
  }, []);

  const onFilter = (key) => {

    let tempState = [];
    if (key === "All") {
      setData(data);
    }
    if (key === "Unapproved") {
      data.forEach((item, i) => {
        if (item.approved == "0") {
          tempState.push(item);
        }
      });
      setData(tempState);
    }
    if (key === "Approved") {
      data.forEach((item, i) => {
        if (item.approved == "1") {
          tempState.push(item);
        }
      });
      setData(tempState);
    }
  };

  return (
    <div className="header-container ">
      <div className="appointments-count">
        <span className="number">{length}</span>
        <h5 className="mt-2">{title}</h5>
      </div>
      <div className="controls-container">
        <div className="search-container">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search"
          />
          <HiSearch className="search-icon" />
        </div>
        <Select
          defaultValue="Select Value"
          style={{
            width: 120,
          }}
          onChange={(e) => onFilter(e)}
          options={options}
        />
      </div>
    </div>
  );
};

export default memo(TableHeader);
