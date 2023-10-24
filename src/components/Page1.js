import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Page1() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleDelete = (productId) => {
    setSelectedProduct(productId);
  };

  const confirmDeleteAction = () => {
    if (selectedProduct) {
      axios
        .delete(`https://northwind.vercel.app/api/products/${selectedProduct}`)
        .then(() => {
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== selectedProduct)
          );
          setSelectedProduct(null);
        })
        .catch((error) => {
          console.error("Ürün silinirken hata oluştu: " + error);
          setSelectedProduct(null);
        });
    }
  };

  useEffect(() => {
    axios
      .get("https://northwind.vercel.app/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Ürünler alınırken hata oluştu: " + error);
      });
  }, []);

  return (
    <div>
      <h2>Product Page</h2>
      <Link to="/page2">Go to Page 2</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Units In Stock</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td style={{ color: product.unitsInStock === 0 ? "red" : "black" }}>
                {product.unitsInStock}
              </td>
              <td>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedProduct && (
        <div>
          <p>Are you sure you want to delete this product?</p>
          <button onClick={confirmDeleteAction}>Yes</button>
          <button onClick={() => setSelectedProduct(null)}>No</button>
        </div>
      )}
    </div>
  );
}

export default Page1;
