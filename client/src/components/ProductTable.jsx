const ProductTable = ({ products, isLoading, onEdit, onDelete }) => {
  return (
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
                    onClick={() => onEdit(product)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-800"
                  >
                    แก้ไข
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
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
  );
};
export default ProductTable;
