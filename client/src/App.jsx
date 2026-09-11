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

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      const data = res.data.data;
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);

      setFormData({
        name: "",
        price: "",
        quantity: 1,
      });
      fetchProducts();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4">
      <h1 className="text-2xl font-bold mb-8">ตารางแสดงรายการสินค้า</h1>

      <div className="w-full mb-8">
        <h2 className="text-xl font-bold mb-4">เพิ่มสินค้าใหม่</h2>
        <form onSubmit={handleSubmit} className="flex gap-4 w-full">
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
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-800"
          >
            Save
          </button>
        </form>
      </div>

      <div className="w-full max-w-3xl bg-white ">
        <table className="w-full border">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th className="px-6 py-2 text-center border-r">ชื่อสินค้า</th>
              <th className="px-6 py-2 text-center border-r">ราคา (บาท)</th>
              <th className="px-6 py-2 text-center">จำนวนคงเหลือ</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 text-center">
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">฿{product.price}</td>
                  <td className="px-6 py-4">{product.quantity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-8 text-center">
                  กำลังโหลดข้อมูล...
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
