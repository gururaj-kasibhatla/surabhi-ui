// src/Components/Admin/ManageMenu.js
 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
 
function ManageMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '', price: '' });
  const [editingItem, setEditingItem] = useState(null);
 
  useEffect(() => {
    fetchMenuItems();
  }, []);
 
  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/menuItems');
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };
 
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingItem({ ...editingItem, [name]: value });
  };
 
  const addItem = async () => {
    try {
      const response = await axios.post('http://localhost:8080/admin/menuItems', newItem);
      setMenuItems([...menuItems, response.data]);
      setNewItem({ name: '', description: '', price: '' });
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };
 
  const updateItem = async (itemId) => {
    try {
      const response = await axios.put(`http://localhost:8080/admin/menuItems/${itemId}`, editingItem);
      setMenuItems(menuItems.map(item => (item.itemId === itemId ? response.data : item)));
      setEditingItem(null);
    } catch (error) {
      console.error('Error updating menu item:', error);
    }
  };
 
  const deleteItem = async (itemId) => {
    console.log("itemId", itemId)
    try {
      await axios.delete(`http://localhost:8080/admin/menuItems/${itemId}`);
      setMenuItems(menuItems.filter(item => item.itemId !== itemId));
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };
 
  return (
<div className="container mt-4">
<h2 className="mb-4">Manage Menu</h2>
<div className="mb-4">
<h4>Add New Item</h4>
<input
          type="text"
          name="name"
          placeholder="Name"
          value={newItem.name}
          onChange={handleInputChange}
          className="form-control mb-2"
        />
<input
          type="text"
          name="description"
          placeholder="Description"
          value={newItem.description}
          onChange={handleInputChange}
          className="form-control mb-2"
        />
<input
          type="number"
          name="price"
          placeholder="Price"
          value={newItem.price}
          onChange={handleInputChange}
          className="form-control mb-2"
        />
<button className="btn btn-primary" onClick={addItem}>
          Add Item
</button>
</div>
 
      <h4 className="mb-4">Current Menu Items</h4>
      {menuItems.map(item => (
<div key={item.itemId} className="card mb-3">
<div className="card-body">
            {editingItem && editingItem.itemId === item.itemId ? (
<>
<input
                  type="text"
                  name="name"
                  value={editingItem.name}
                  onChange={handleEditInputChange}
                  className="form-control mb-2"
                />
<input
                  type="text"
                  name="description"
                  value={editingItem.description}
                  onChange={handleEditInputChange}
                  className="form-control mb-2"
                />
<input
                  type="number"
                  name="price"
                  value={editingItem.price}
                  onChange={handleEditInputChange}
                  className="form-control mb-2"
                />
<button className="btn btn-success mr-2" onClick={() => updateItem(item.itemId)}>
                  Save
</button>
<button className="btn btn-secondary" onClick={() => setEditingItem(null)}>
                  Cancel
</button>
</>
            ) : (
<>
<h5 className="card-title">{item.name}</h5>
<p className="card-text">{item.description}</p>
<p className="card-text font-weight-bold">${item.price.toFixed(2)}</p>
<button className="btn btn-warning" style={{ marginRight: '20px' }} onClick={() => setEditingItem(item)}>
    Edit
</button>
<button className="btn btn-danger" onClick={() => deleteItem(item.itemId)}>
    Delete
</button>
{/* <button className="btn btn-warning mr-2" onClick={() => setEditingItem(item)}>
                  Edit
</button>
<button className="btn btn-danger" onClick={() => deleteItem(item.itemId)}>
                  Delete
</button> */}
</>
            )}
</div>
</div>
      ))}
</div>
  );
}
 
export default ManageMenu;