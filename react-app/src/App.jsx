/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App*/

import { useEffect, useState } from "react";
import "./App.css";

function App() {

  const API = "/api/products/";

  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editId, setEditId] = useState(null);

  // load data
  const loadProducts = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // create
  const addProduct = async () => {

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price
      })
    });

    setName("");
    setPrice("");

    loadProducts();
  };

  // prepare edit
  const editProduct = (product) => {
    setEditId(product.id);
    setName(product.name);
    setPrice(product.price);
  };

  // update
  const updateProduct = async () => {

    await fetch(`/api/products/${editId}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price
      })
    });

    setEditId(null);
    setName("");
    setPrice("");

    loadProducts();
  };

  // delete
  const deleteProduct = async (id) => {

    await fetch(`/api/products/${id}/`, {
      method: "DELETE"
    });

    loadProducts();
  };

  return (
    <div style={{ padding: "40px" }}>

      <h1>Product List</h1>

      {/* form */}
      <div style={{ marginBottom: "20px" }}>

        <input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        {editId ? (
          <button className="btn-update" onClick={updateProduct}>
            Update
          </button>
        ) : (
          <button className="btn-add" onClick={addProduct}>
            Add
          </button>
        )}

      </div>

      {/* table */}
      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th width="150">Action</th>
          </tr>
        </thead>

        <tbody>

          {products.map((p) => (
            <tr key={p.id}>

              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>

              <td>

                <button className="btn-edit" onClick={() => editProduct(p)}>
                  Edit
                </button>

                <button
                  className="btn-delete" 
                  onClick={() => deleteProduct(p.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default App;