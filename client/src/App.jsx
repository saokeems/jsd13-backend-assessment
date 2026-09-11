import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: 1,
  });
  const [editProduct, setEditProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(API_URL);
      const data = res.data.data;
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Error fetching products");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditProduct(product.id);
    setFormData({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editProduct) {
        await axios.put(`${API_URL}/${editProduct}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setFormData({
        name: "",
        price: "",
        quantity: 1,
      });
      setEditProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4">
      <h1 className="text-2xl font-bold mb-8">ตารางแสดงรายการสินค้า</h1>

      {error && (
        <div className="w-full mb-4 p-4 bg-red-100 text-red-700 rounded-md text-center border border-red-300">
          {error}
        </div>
      )}

      <ProductForm
        formData={formData}
        setFormData={setFormData}
        editProduct={editProduct}
        onSubmit={handleSubmit}
        onCancel={() => {
          setEditProduct(null);
          setFormData({ name: "", price: "", quantity: 1 });
        }}
      />

      <ProductTable
        products={products}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};
export default App;
