import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  fetchAllVoucherTypes,
  deleteVoucherTypeById,
} from "../../services/VoucherTypeService";

const VoucherTypeTable = () => {
  const [voucherTypes, setVoucherTypes] = useState([]);

  const getAllVoucherTypes = async () => {
    const res = await fetchAllVoucherTypes();

    if (res && res.result) {
      setVoucherTypes(res.result);
      console.log(res.result);
    }
  };

  useEffect(() => {
    getAllVoucherTypes();
  }, []);

  const navigator = useNavigate();

  const deleteVoucherType = async (id) => {
    const res = await deleteVoucherTypeById(id);

    if (res && res.message) {
      toast.success(res.message);
    } else {
      toast.error("Error deleting a voucher type!");
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
        <h2>Voucher Type Management</h2>
        <button
          className="templatemo-blue-button"
          onClick={() => navigator("/admin/voucher-types/add")}
        >
          Add new category
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
                  Voucher Type Name <span className="caret"></span>
                </a>
              </td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {voucherTypes &&
              voucherTypes.length > 0 &&
              voucherTypes.map((voucherType, index) => (
                <tr key={`voucherType-${index}`}>
                  <th>{index + 1}</th>
                  <td>{voucherType.name}</td>
                  <td>
                    <button
                      className="templatemo-edit-btn"
                      onClick={() =>
                        navigator(`/admin/edit-voucher-type/${voucherType.id}`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="templatemo-delete-btn"
                      onClick={() => deleteVoucherType(voucherType.id)}
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

export default VoucherTypeTable;
