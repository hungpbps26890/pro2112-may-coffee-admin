import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchAllOrders, deleteOrderById } from "../../services/OrderService";
import { NumericFormat } from "react-number-format";
import { format } from "date-fns";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);

  const getAllOrders = async () => {
    const res = await fetchAllOrders();

    if (res && res.result) {
      setOrders(res.result);
      console.log(res.result);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const navigator = useNavigate();

  const deleteOrder = async (id) => {
    const res = await deleteOrderById(id);

    if (res && res.message) {
      toast.success(res.message);
    } else {
      toast.error("Error deleting an oder!");
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
        <h2>Order Management</h2>
        <button
          className="templatemo-blue-button"
          onClick={() => navigator("/admin/orders/add")}
        >
          Add new order
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
                  Total Price <span className="caret"></span>
                </a>
              </td>
              <td>
                <a href="" className="white-text templatemo-sort-by">
                  User Name <span className="caret"></span>
                </a>
              </td>
              <td>
                <a href="" className="white-text templatemo-sort-by">
                  Create Date <span className="caret"></span>
                </a>
              </td>
              <td>
                <a href="" className="white-text templatemo-sort-by">
                  Payment Status <span className="caret"></span>
                </a>
              </td>
              <td>
                <a href="" className="white-text templatemo-sort-by">
                  Table Number <span className="caret"></span>
                </a>
              </td>
              <td>
                <a href="" className="white-text templatemo-sort-by">
                  Delivery Charge <span className="caret"></span>
                </a>
              </td>
              <td>
                <a href="" className="white-text templatemo-sort-by">
                  Payment Method Bank <span className="caret"></span>
                </a>
              </td>
              <td>
                <a href="" className="white-text templatemo-sort-by">
                  Order Status <span className="caret"></span>
                </a>
              </td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.length > 0 &&
              orders.map((order, index) => (
                <tr key={`order-${index}`}>
                  <th>{index + 1}</th>
                  <td>
                    <NumericFormat
                      displayType="text"
                      value={order.totalPrice}
                      allowLeadingZeros
                      thousandSeparator
                    />
                  </td>
                  <td>{order.userName}</td>
                  <td>{format(new Date(order.createDate), "dd/MM/yyyy")}</td>
                  <td>{order.paymentStatus}</td>
                  <td>{order.tableNumber}</td>
                  <td>{order.deliveryCharge}</td>
                  <td>{order.paymentMethodBankId}</td>
                  <td>{order.orderStatusId}</td>
                  <td>
                    <button
                      className="templatemo-edit-btn"
                      onClick={() => navigator(`/admin/edit-order/${order.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="templatemo-delete-btn"
                      onClick={() => deleteOrder(order.id)}
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

export default OrderTable;
