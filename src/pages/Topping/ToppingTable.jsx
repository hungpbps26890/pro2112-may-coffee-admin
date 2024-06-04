import React, { useEffect, useState } from "react";
import {
  deleteToppingById,
  fetchGetAllToppings,
} from "../../services/ToppingService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ToppingTable = () => {
  const [toppings, setToppings] = useState([]);

  const getAllToppings = async () => {
    const res = await fetchGetAllToppings();

    if (res && res.result) {
      setToppings(res.result);
      console.log(res.result);
    }
  };

  useEffect(() => {
    getAllToppings();
  }, []);

  const navigator = useNavigate();

  const deleteTopping = async (id) => {
    const res = await deleteToppingById(id);

    if (res && res.message) {
      toast.success(res.message);
    } else {
      toast.error("Error deleting a topping!");
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
        <h2>Topping Management</h2>
        <button
          className="templatemo-blue-button"
          onClick={() => navigator("/admin/toppings/add")}
        >
          Add new topping
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
                  Topping Name <span className="caret"></span>
                </a>
              </td>
              <td>
                <a href="" className="white-text templatemo-sort-by">
                  Price <span className="caret"></span>
                </a>
              </td>
              <td>
                <a href="" className="white-text templatemo-sort-by">
                  Active<span className="caret"></span>
                </a>
              </td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {toppings &&
              toppings.length > 0 &&
              toppings.map((topping, index) => (
                <tr key={`topping-${index}`}>
                  <th>{index + 1}</th>
                  <td>{topping.name}</td>
                  <td>{topping.price}</td>
                  <td>{topping.isActive ? "Active" : "Inactive"}</td>
                  <td>
                    <button
                      className="templatemo-edit-btn"
                      onClick={() =>
                        navigator(`/admin/edit-topping/${topping.id}`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="templatemo-delete-btn"
                      onClick={() => deleteTopping(topping.id)}
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

export default ToppingTable;
