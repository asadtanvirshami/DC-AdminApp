import React from "react";

import { FunnelPlotOutlined } from "@ant-design/icons";
import { HiSearch } from "react-icons/hi";

const TableHeader = ({ length, title, setSearchTerm }) => {
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
          <HiSearch class="search-icon" />
        </div>
        {/* <div className="sort-container">
          <label >Sort By</label>
          <select>
            <option value="name">Sort By</option>
            <option value="time">Time</option>
            <option value="location">Location</option>
          </select>
          <FunnelPlotOutlined className="sort-icon" />
        </div> */}
      </div>
    </div>
  );
};

export default TableHeader;
