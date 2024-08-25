import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  fetchAllCategories,
  deleteCategoryById,
} from "../../services/CategoryService";

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);

  const getAllCategories = async () => {
    const res = await fetchAllCategories();

    if (res && res.result) {
      setCategories(res.result);
      console.log(res.result);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const navigator = useNavigate();

  const deleteCategory = async (id) => {
    const res = await deleteCategoryById(id);

    if (res && res.message) {
      toast.success(res.message);
      getAllCategories();
    } else {
      toast.error("Error deleting a category!");
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
        <h2>Category Management</h2>
        <button
          className="templatemo-blue-button"
          onClick={() => navigator("/admin/categories/add")}
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
                  Category Name <span className="caret"></span>
                </a>
              </td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.length > 0 &&
              categories.map((category, index) => (
                <tr key={`category-${index}`}>
                  <th>{index + 1}</th>
                  <td>{category.name}</td>
                  <td>
                    <button
                      className="templatemo-edit-btn"
                      onClick={() =>
                        navigator(`/admin/edit-category/${category.id}`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="templatemo-delete-btn"
                      onClick={() => deleteCategory(category.id)}
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
