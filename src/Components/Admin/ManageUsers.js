import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '', role: '' });
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingValues, setEditingValues] = useState({ username: '', password: '', role: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingValues({ ...editingValues, [name]: value });
  };

  const addUser = async () => {
    try {
      const response = await axios.post('http://localhost:8080/users', newUser);
      setUsers([...users, response.data]);
      setNewUser({ username: '', password: '', role: '' });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const updateUser = async (userId) => {
    try {
      const response = await axios.put(`http://localhost:8080/users/${userId}`, editingValues);
      setUsers(users.map(user => (user.userId === userId ? response.data : user)));
      setEditingUserId(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/users/${userId}`);
      setUsers(users.filter(user => user.userId !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditClick = (user) => {
    setEditingUserId(user.userId);
    setEditingValues({ username: user.username, password: user.password, role: user.role });
  };


  return (
    <div className="container mt-4">
      <div className="mb-4">
        <h4>Add New User</h4>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={newUser.username}
          onChange={handleInputChange}
          className="form-control mb-2"
        />
        <input
          type="text"
          name="password"
          placeholder="password"
          value={newUser.password}
          onChange={handleInputChange}
          className="form-control mb-2"
        />
        <input
          type="text"
          name="role"
          placeholder="role"
          value={newUser.role}
          onChange={handleInputChange}
          className="form-control mb-2"
        />
        <button className="btn btn-primary" onClick={addUser}>
          Add User
        </button>
      </div>

      <h4 className="mb-4">Current Users</h4>
      <div className="row">
        {users.map(user => (
          <div key={user.userId} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                {editingUserId === user.userId ? (
                  <>
                    <input
                      type="text"
                      name="username"
                      value={editingValues.username}
                      onChange={handleEditInputChange}
                      className="form-control mb-2"
                    />
                    <input
                      type="text"
                      name="password"
                      value={editingValues.password}
                      onChange={handleEditInputChange}
                      className="form-control mb-2"
                    />
                    <input
                      type="text"
                      name="role"
                      value={editingValues.role}
                      onChange={handleEditInputChange}
                      className="form-control mb-2"
                    />
                    <button className="btn btn-success mr-2" onClick={() => updateUser(user.userId)}>
                      Save
                    </button>
                    <button className="btn btn-secondary" onClick={() => setEditingUserId(null)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <h5 className="card-title">{user.username}</h5>
                    <p className="card-text">{user.password}</p>
                    <p className="card-text font-weight-bold">{user.role}</p>
                    <button className="btn btn-warning mr-2" onClick={() => handleEditClick(user)}>
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => deleteUser(user.userId)}>
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageUsers;
