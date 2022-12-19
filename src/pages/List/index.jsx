import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserHooks from "../../hooks/useUser";

function List() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    await UserHooks.getAll()
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleDelete = async(id) => {
    await UserHooks.remove(id).then((response) => {
      setUsers(users.filter((user) => user.id !== id));
    });
  };
  return (
    <div className="container">
      <h2 style={{ textAlign: "center", margin: "30px" }}>Data Users</h2>
      <Link to={'create'} className="btn btn-primary m-3">
        Create
      </Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <div className="btn-group">
                  <Link to={`/edit/${user.id}`} className="btn btn-primary">
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(user.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default List;
