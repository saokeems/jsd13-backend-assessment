import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [products, setProducts] = useState([]);
  // const [formData, setFormData] = useState({
  //   name: "",
  //   price: "",
  //   quantity: 1,
  // });
  // const [editProduct, setEditProduct] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4">
      <h1 className="text-2xl font-bold mb-8">ตารางแสดงรายการสินค้า</h1>
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
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 text-center"
                >
                  <td className="px-6 py-4">
                    {product.name}
                  </td>
                  <td className="px-6 py-4">
                    ฿{product.price}
                  </td>
                  <td className="px-6 py-4">
                    {product.quantity}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="px-6 py-8 text-center"
                >
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
