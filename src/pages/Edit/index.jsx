import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserHooks from "../../hooks/useUser";

function Edit() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async() => {
    await UserHooks.getById(id)
      .then((response) => {
        setName(response.data.name);
        setEmail(response.data.email);
        setUsername(response.data.username);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const input = {
      name: name,
      username: username,
      email: email,
    };
    UserHooks.update(id, input).then((response) => {
      navigate("/");
    });
  };
  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title mb-5">Edit User</h5>
          <div className="card-text">
            <form onSubmit={handleSubmit}>
              <div className="form-group m-2">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group m-2">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group m-2">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <br />
              <button type="submit" className="btn btn-primary m-2">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
