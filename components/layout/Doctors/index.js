import React, { useState, useEffect, memo } from "react";
import axios from "axios";

import TableCom from "@/components/shared/Table/Table";
import TableFooter from "@/components/shared/Table/TableFooter";
import TableHeader from "@/components/shared/Table/TableHeader";

const Doctors = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  async function getAllDoctors() {
    await axios
      .get(process.env.NEXT_PUBLIC_GET_DOCTORS, {
        headers: { page: currentPage, limit: pageSize },
      })
      .then((r) => {
        if (r.data.status === "success") {
          setData(r.data.result);
          setFilteredData(r.data.result);
          setTotalPages(Math.ceil(r.data.totalItems / pageSize));
        }
        setLoading(false);
      });
  }

  const deleteDoctor = async (id) => {
    setLoading(true);
    await axios
      .delete(process.env.NEXT_PUBLIC_DELETE_DOCTORS, { headers: { id: id } })
      .then((r) => {
        setFilteredData((prevFilteredData) =>
          prevFilteredData.filter((item) => item.id !== id)
        );
        setData((prevFilteredData) =>
          prevFilteredData.filter((item) => item.id !== id)
        );
        setLoading(false);
      });
  };

  const verifyDoctor = async (id, status) => {
    let approved = status === null || status === "0" ? "1" : "0";
    await axios
      .post(process.env.NEXT_PUBLIC_APPROVE_DOCTORS, {
        id: id,
        approved: approved,
      })
      .then((r) => {
        if (r.data.status === "success") {
          setFilteredData((prevFilteredData) =>
            prevFilteredData.map((item) =>
              item.id === id ? { ...item, approved: approved } : item
            )
          );

          setData((prevData) =>
            prevData.map((item) =>
              item.id === id ? { ...item, approved: approved } : item
            )
          );
        }
      });
  };

  const searchDoctor = async (term) => {
    if (term.length > 2) {
      setLoading(true);
      axios
        .get(process.env.NEXT_PUBLIC_SEARCH_DOCTORS, {
          headers: { searchTerm: `${term}` },
        })
        .then((r) => {
          setFilteredData(r.data.result);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    searchDoctor(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    getAllDoctors();
  }, [currentPage]);

  return (
    <div className="border rounded shadow m-5 p-5">
      <TableHeader
        keys={["All", "Unapproved", "Approved"]}
        setSearchTerm={setSearchTerm}
        length={filteredData.length}
        setData={setFilteredData}
        data={data}
        title={"Doctors Data"}
      />
      <TableCom
        loading={loading}
        handleDelete={deleteDoctor}
        onClick={verifyDoctor}
        pageName={"doctor"}
        data={filteredData}
      />
      <TableFooter
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        lenghtSize={filteredData.length}
        viewTable={true}
      />
    </div>
  );
};

export default memo(Doctors);
