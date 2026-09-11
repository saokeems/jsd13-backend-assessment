import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

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

      <div className="w-full mb-8 flex flex-col">
        <h2 className="text-xl font-bold mb-4">
          {editProduct ? "แก้ไขข้อมูลสินค้า" : "เพิ่มสินค้าใหม่"}
        </h2>
        <form onSubmit={handleSubmit} className="flex gap-4 w-full flex-wrap">
          <input
            type="text"
            placeholder="ชื่อสินค้า"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="p-2 rounded-md bg-white flex-1"
            required
          />
          <input
            type="text"
            placeholder="ราคา (บาท)"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            className="p-2 rounded-md bg-white flex-1"
            required
          />
          <input
            type="number"
            placeholder="จำนวนสินค้า"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({ ...formData, quantity: e.target.value })
            }
            className="p-2 rounded-md bg-white flex-1"
            required
            min="1"
          />
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-800"
            >
              {editProduct ? "บันทึก" : "เพิ่ม"}
            </button>
            {editProduct && (
              <button
                type="button"
                onClick={() => {
                  setEditProduct(null);
                  setFormData({
                    name: "",
                    price: "",
                    quantity: 1,
                  });
                }}
                className="bg-slate-600 text-white px-3 py-2 rounded-md hover:bg-slate-800"
              >
                ยกเลิก
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="w-full max-w-3xl bg-white ">
        <table className="w-full border">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th className="px-6 py-2 text-center border-r">ชื่อสินค้า</th>
              <th className="px-6 py-2 text-center border-r">ราคา (บาท)</th>
              <th className="px-6 py-2 text-center border-r">จำนวนคงเหลือ</th>
              <th className="px-6 py-2 text-center">action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {isLoading ? (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center">
                  กำลังโหลดข้อมูล...
                </td>
              </tr>
            ) : products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 text-center">
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">฿{product.price}</td>
                  <td className="px-6 py-4">{product.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-800"
                    >
                      แก้ไข
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-900 bg-red-100 px-3 py-1 rounded-md"
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center">
                  ยังไม่มีสินค้า
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default App;
