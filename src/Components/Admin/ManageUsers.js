// src/Components/Admin/ManageUsers.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'user' });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/users');
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
    setEditingUser({ ...editingUser, [name]: value });
  };

  const addUser = async () => {
    try {
      const response = await axios.post('http://localhost:8080/admin/users', newUser);
      setUsers([...users, response.data]);
      setNewUser({ username: '', password: '', role: 'user' });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const updateUser = async (userId) => {
    try {
      const response = await axios.put(`http://localhost:8080/admin/users/${userId}`, editingUser);
      setUsers(users.map(user => (user.userId === userId ? response.data : user)));
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/admin/users/${userId}`);
      setUsers(users.filter(user => user.userId !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Manage Users</h2>
      <div className="mb-4">
        <h4>Add New User</h4>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={newUser.username}
          onChange={handleInputChange}
          className="form-control mb-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newUser.password}
          onChange={handleInputChange}
          className="form-control mb-2"
        />
        <select
          name="role"
          value={newUser.role}
          onChange={handleInputChange}
          className="form-control mb-2"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button className="btn btn-primary" onClick={addUser}>
          Add User
        </button>
      </div>

      <h4 className="mb-4">Current Users</h4>
      {users.map(user => (
        <div key={user.userId} className="card mb-3">
          <div className="card-body">
            {editingUser && editingUser.userId === user.userId ? (
              <>
                <input
                  type="text"
                  name="username"
                  value={editingUser.username}
                  onChange={handleEditInputChange}
                  className="form-control mb-2"
                />
                <input
                  type="password"
                  name="password"
                  value={editingUser.password}
                  onChange={handleEditInputChange}
                  className="form-control mb-2"
                />
                <select
                  name="role"
                  value={editingUser.role}
                  onChange={handleEditInputChange}
                  className="form-control mb-2"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <button className="btn btn-success mr-2" onClick={() => updateUser(user.userId)}>
                  Save
                </button>
                <button className="btn btn-secondary" onClick={() => setEditingUser(null)}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h5 className="card-title">{user.username}</h5>
                <p className="card-text">Role: {user.role}</p>
                <button className="btn btn-warning mr-2" onClick={() => setEditingUser(user)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => deleteUser(user.userId)}>
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ManageUsers;
