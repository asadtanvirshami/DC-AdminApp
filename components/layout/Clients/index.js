import React, { useState, useEffect, memo } from "react";
import axios from "axios";

import TableCom from "@/components/shared/Table/Table";
import TableFooter from "@/components/shared/Table/TableFooter";
import TableHeader from "@/components/shared/Table/TableHeader";

const Clients = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  async function getAllClients() {
    await axios
      .get(process.env.NEXT_PUBLIC_GET_CLIENTS, {
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

  const deleteClient = (id) => {
    axios
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

  const verifyClient = (id, status) => {
    let approved = status === null || status === "0" ? "1" : "0";
    axios
      .post(process.env.NEXT_PUBLIC_APPROVE_CLIENT, {
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

  const searchClient = async (term) => {
    if (term.length > 2) {
      setLoading(true);
      axios
        .get(process.env.NEXT_PUBLIC_SEARCH_CLIENTS, {
          headers: { searchTerm: `${term}` },
        })
        .then((r) => {
          setFilteredData(r.data.result);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    searchClient(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    getAllClients();
  }, [currentPage]);

  return (
    <div className="border rounded shadow m-5 p-5">
      <TableHeader
        keys={["All", "Unapproved", "Approved"]}
        setSearchTerm={setSearchTerm}
        setData={setFilteredData}
        data={data}
        length={data.length}
        title={"Clients Data"}
      />
      <TableCom
        loading={loading}
        pageName={"client"}
        data={filteredData}
        handleDelete={deleteClient}
        onClick={verifyClient}
      />
      <TableFooter
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        lenghtSize={data.length}
        viewTable={true}
      />
    </div>
  );
};

export default memo(Clients);
