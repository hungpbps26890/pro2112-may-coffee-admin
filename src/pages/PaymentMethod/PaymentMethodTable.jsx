import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  fetchAllPaymentMethods,
  deletePaymentMethodById,
} from "../../services/PaymentMethodService";

const PaymentMethodTable = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);

  const getAllPaymentMethods = async () => {
    const res = await fetchAllPaymentMethods();

    if (res && res.result) {
      setPaymentMethods(res.result);
      console.log(res.result);
    }
  };

  useEffect(() => {
    getAllPaymentMethods();
  }, []);

  const navigator = useNavigate();

  const deletePaymentMethod = async (id) => {
    const res = await deletePaymentMethodById(id);

    if (res && res.message) {
      toast.success(res.message);
    } else {
      toast.error("Error deleting a payment method!");
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
        <h2>Payment Method Management</h2>
        <button
          className="templatemo-blue-button"
          onClick={() => navigator("/admin/payment-methods/add")}
        >
          Add new payment method
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
                  Payment Method Name <span className="caret"></span>
                </a>
              </td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {paymentMethods &&
              paymentMethods.length > 0 &&
              paymentMethods.map((paymentMethod, index) => (
                <tr key={`category-${index}`}>
                  <th>{index + 1}</th>
                  <td>{paymentMethod.name}</td>
                  <td>
                    <button
                      className="templatemo-edit-btn"
                      onClick={() =>
                        navigator(`/admin/edit-payment-methods/${paymentMethod.id}`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="templatemo-delete-btn"
                      onClick={() => deletePaymentMethod(paymentMethod.id)}
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

export default PaymentMethodTable;
