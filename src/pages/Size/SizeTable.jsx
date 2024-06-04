import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteSizeById, fetchGetAllSizes } from "../../services/SizeService";

const SizeTable = () => {
  const [sizes, setSizes] = useState([]);

  const getAllSizes = async () => {
    const res = await fetchGetAllSizes();

    if (res && res.result) {
      setSizes(res.result);
      console.log(res.result);
    }
  };

  useEffect(() => {
    getAllSizes();
  }, []);

  const navigator = useNavigate();

  const deleteSize = async (id) => {
    const res = await deleteSizeById(id);

    if (res && res.message) {
      toast.success(res.message);
    } else {
      toast.error("Error deleting a size!");
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
        <h2>Size Management</h2>
        <button
          className="templatemo-blue-button"
          onClick={() => navigator("/admin/sizes/add")}
        >
          Add new size
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
                  Size Name <span className="caret"></span>
                </a>
              </td>
              <td>
                <a href="" className="white-text templatemo-sort-by">
                  Character <span className="caret"></span>
                </a>
              </td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {sizes &&
              sizes.length > 0 &&
              sizes.map((size, index) => (
                <tr key={`size-${index}`}>
                  <th>{index + 1}</th>
                  <td>{size.name}</td>
                  <td>{size.character}</td>
                  <td>
                    <button
                      className="templatemo-edit-btn"
                      onClick={() => navigator(`/admin/edit-size/${size.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="templatemo-delete-btn"
                      onClick={() => deleteSize(size.id)}
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

export default SizeTable;
