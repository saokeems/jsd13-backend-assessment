const ProductForm = ({ formData, setFormData, editProduct, onSubmit, onCancel }) => {
  return (
    <>
      <div className="w-full mb-8 flex flex-col">
        <h2 className="text-xl font-bold mb-4">
          {editProduct ? "แก้ไขข้อมูลสินค้า" : "เพิ่มสินค้าใหม่"}
        </h2>
        <form onSubmit={onSubmit} className="flex gap-4 w-full flex-wrap">
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
                onClick={onCancel}
                className="bg-slate-600 text-white px-3 py-2 rounded-md hover:bg-slate-800"
              >
                ยกเลิก
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};
export default ProductForm;
