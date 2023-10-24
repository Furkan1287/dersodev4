import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Page2() {
  const [name, setName] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [unitsInStock, setUnitsInStock] = useState('');

  const handleAddProduct = () => {
    if (!name || !unitPrice || !unitsInStock) {
      alert('Please fill in all fields.');
      return;
    }

    const newProduct = {
      name,
      unitPrice: parseFloat(unitPrice),
      unitsInStock: parseInt(unitsInStock),
    };

    axios
      .post('https://northwind.vercel.app/api/products', newProduct)
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error('An error occurred while adding the product: ' + error);
      });
  };

  return (
    <div>
      <h1>Add Product</h1>
      <div>
        <label>Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Unit Price: </label>
        <input
          type="number"
          value={unitPrice}
          onChange={(e) => setUnitPrice(e.target.value)}
        />
      </div>
      <div>
        <label>Units in Stock: </label>
        <input
          type="number"
          value={unitsInStock}
          onChange={(e) => setUnitsInStock(e.target.value)}
        />
      </div>
      <button onClick={handleAddProduct}>Add</button>
      <Link to="/page1">Back to Page 1</Link>
    </div>
  );
}

export default Page2;