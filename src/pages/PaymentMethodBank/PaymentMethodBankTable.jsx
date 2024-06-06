import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  fetchAllPaymentMethodBanks,
  deletePaymentMethodBankById,
} from "../../services/PaymentMethodBankService";

const CategoryTable = () => {
  const [paymentMethodBanks, setPaymentMethodBanks] = useState([]);

  const getAllPaymentMethodBanks = async () => {
    const res = await fetchAllPaymentMethodBanks();

    if (res && res.result) {
      setPaymentMethodBanks(res.result);
      console.log(res.result);
    }
  };

  useEffect(() => {
    getAllPaymentMethodBanks();
  }, []);

  const navigator = useNavigate();

  const deletePaymentMethodBank = async (id) => {
    const res = await deletePaymentMethodBankById(id);

    if (res && res.message) {
      toast.success(res.message);
    } else {
      toast.error("Error deleting a payment method bank!");
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
        <h2>Payment Method Bank Management</h2>
        <button
          className="templatemo-blue-button"
          onClick={() => navigator("/admin/payment-method-banks/add")}
        >
          Add new payment method bank
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
                Owner <span className="caret"></span>
                </a>
              </td>
              <td>
                <a href="" className="white-text templatemo-sort-by">
                Credit Card <span className="caret"></span>
                </a>
              </td>
              <td>
                <a href="" className="white-text templatemo-sort-by">
                Total Price <span className="caret"></span>
                </a>
              </td>
              <td>
                <a href="" className="white-text templatemo-sort-by">
                Date <span className="caret"></span>
                </a>
              </td>
              <td>
                <a href="" className="white-text templatemo-sort-by">
                Payment Method <span className="caret"></span>
                </a>
              </td>
              <td>
                <a href="" className="white-text templatemo-sort-by">
                Bank <span className="caret"></span>
                </a>
              </td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {paymentMethodBanks &&
              paymentMethodBanks.length > 0 &&
              paymentMethodBanks.map((paymentMethodBank, index) => (
                <tr key={`category-${index}`}>
                  <th>{index + 1}</th>
                  <td>{paymentMethodBank.owner}</td>
                  <td>{paymentMethodBank.creditCard}</td>
                  <td>{paymentMethodBank.totalPrice}</td>
                  <td>{paymentMethodBank.date}</td>
                  <td>{paymentMethodBank.paymentMethodId}</td>
                  <td>{paymentMethodBank.bankId}</td>
                  <td>
                    <button
                      className="templatemo-edit-btn"
                      onClick={() =>
                        navigator(`/admin/edit-payment-method-bank/${paymentMethodBank.id}`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="templatemo-delete-btn"
                      onClick={() => deletePaymentMethodBank(paymentMethodBank.id)}
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

export default CategoryTable;
