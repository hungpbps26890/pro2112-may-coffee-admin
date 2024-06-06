import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  fetchAllBanks,
  deleteBankById,
} from "../../services/BankService";

const BankTable = () => {
  const [banks, setBanks] = useState([]);

  const getAllBanks = async () => {
    const res = await fetchAllBanks();

    if (res && res.result) {
      setBanks(res.result);
    }
  };

  useEffect(() => {
    getAllBanks();
    console.log(banks)
  }, []);

  const navigator = useNavigate();

  const deleteBank = async (id) => {
    const res = await deleteBankById(id);

    if (res && res.message) {
      toast.success(res.message);
      getAllBanks();
    } else {
      toast.error("Error deleting a bank!");
    }
  };
  return (
    <div className="templatemo-content-widget white-bg">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h2>Bank Management</h2>
        <button
          className="templatemo-blue-button"
          onClick={() => navigator("/admin/banks/add")}
        >
          Add new bank
        </button>
      </div>
      <div className="panel panel-default table-responsive">
        <table className="table table-striped table-bordered templatemo-user-table">
          <thead>
            <tr>
              <td>
                <a href="" className="white-text templatemo-sort-by">
                  # <span className="caret"></span>
                </a>
              </td>
              <td>
                <a href="" className="white-text templatemo-sort-by">
                  Bank Name <span className="caret"></span>
                </a>
              </td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {banks &&
              banks.length > 0 &&
              banks.map((bank, index) => (
                <tr key={`bank-${index}`}>
                  <th>{index + 1}</th>
                  <td>{bank.name}</td>
                  <td>
                    <button
                      className="templatemo-edit-btn"
                      onClick={() =>
                        navigator(`/admin/edit-bank/${bank.id}`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="templatemo-delete-btn"
                      onClick={() => deleteBank(bank.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BankTable;
