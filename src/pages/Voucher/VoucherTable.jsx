import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  fetchAllVouchers,
  deleteVoucherById,
} from "../../services/VoucherService";
import { fetchGetVoucherTypeById } from "../../services/VoucherTypeService";
import { format } from "date-fns";

const VoucherTable = () => {
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    getAllVouchers();
  }, []);

  const getAllVouchers = async () => {
    const res = await fetchAllVouchers();
    if (res && res.result) {
      setVouchers(res.result);
      console.log(res.result);
    }
  };

  const handleVoucherTypeName = async (id) => {
    const res = await fetchGetVoucherTypeById(id);
    if (res && res.result) {
      const name = res.result.name;
      return name;
    }
  };

  const navigator = useNavigate();

  const deleteVoucher = async (id) => {
    const res = await deleteVoucherById(id);

    if (res && res.message) {
      toast.success(res.message);
    } else {
      toast.error("Error deleting a voucher!");
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
        <h2>Voucher Management</h2>
        <button
          className="templatemo-blue-button"
          onClick={() => navigator("/admin/vouchers/add")}
        >
          Add new voucher
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
                  Voucher Type <span className="caret"></span>
                </a>
              </td>
              <td>
                <a href="" className="white-text templatemo-sort-by">
                  Discount Code <span className="caret"></span>
                </a>
              </td>
              <td>
                <a href="" className="white-text templatemo-sort-by">
                  Amount <span className="caret"></span>
                </a>
              </td>
              <td>
                <a href="" className="white-text templatemo-sort-by">
                  Begin Date <span className="caret"></span>
                </a>
              </td>
              <td>
                <a href="" className="white-text templatemo-sort-by">
                  End Date <span className="caret"></span>
                </a>
              </td>
              <td>
                <a href="" className="white-text templatemo-sort-by">
                  Image <span className="caret"></span>
                </a>
              </td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {vouchers &&
              vouchers.length > 0 &&
              vouchers.map((voucher, index) => (
                <tr key={`voucher-${index}`}>
                  <th>{index + 1}</th>
                  <th></th>
                  <td>{voucher.discountCode}</td>
                  <td>{voucher.amount}</td>
                  <td>{format(new Date(voucher.beginDate), "dd/MM/yyyy")}</td>
                  <td>{format(new Date(voucher.endDate), "dd/MM/yyyy")}</td>
                  <td>{voucher.image}</td>
                  <td>
                    <button
                      className="templatemo-edit-btn"
                      onClick={() =>
                        navigator(`/admin/edit-voucher/${voucher.id}`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="templatemo-delete-btn"
                      onClick={() => deleteVoucher(voucher.id)}
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

export default VoucherTable;
