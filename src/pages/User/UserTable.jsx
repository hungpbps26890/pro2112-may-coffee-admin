// react arrow function const export
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  deleteUserById, 
  fetchGetAllUsers }
   from '../../services/UserService'
import { deleteToppingById } from '../../services/ToppingService';
import { toast } from 'react-toastify';

const UserTable = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async() => {
    const res = await fetchGetAllUsers();

    if(res && res.result){
      setUsers(res.result);
      console.log(res.result);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  const navigator = useNavigate();

  const deleteUser = async(id) => {
    const res = await deleteUserById(id);

    if(res && res.result){
      toast.success(res.message);
    }else{
      toast.error("Error deleteing an user!")
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
        <h2>User Management</h2>
        <button
          className="templatemo-blue-button"
          onClick={() => navigator("/admin/users/add")}
        >
          Add new user
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
                  Username<span className="caret"></span>
                </a>
              </td>
              <td>
                <a href="" className="white-text templatemo-sort-by">
                    Fullname <span className="caret"></span>
                </a>
              </td>
              <td>
                <a href="" className="white-text templatemo-sort-by">
                  Email<span className="caret"></span>
                </a>
              </td>
              <td>
                <a href="" className="white-text templatemo-sort-by">
                  Phone Number<span className="caret"></span>
                </a>
              </td>
              <td>Role</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {users && 
            users.length > 0 &&
            users.map((user, index) => (
                <tr key = {`user - ${index}`}>
                  <th>{index + 1}</th>
                  <td>{user.username}</td>
                  <td>{user.lastName} {user.firstName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.roles.map(role => (<span key={role.name}>{role.name}</span>))}</td>
                  {/* <td>{user.isActive ? "Active" : "Inactive"}</td> */}
                  <td>
                    <button className='templatemo-edit-btn'
                      onClick={() => 
                        navigator(`/admin/edit-user/${user.id}`)
                      }
                    >
                      Edit
                    </button>
                    <button 
                      className='templatemo-delete-btn'
                      onClick={() => deleteUser(user.id)}
                    >
                      Del
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

export default UserTable