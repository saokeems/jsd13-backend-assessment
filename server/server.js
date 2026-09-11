import express from "express";
import { products } from "./fakeDB/fakeProducts.js";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()} ] ${req.method} ${req.url}`);
  next();
});

// get all products
app.get("/products", (req, res, next) => {
  try {
    return res.status(200).json({ success: true, products });
  } catch (error) {
    next(error);
  }
});

// all a product
app.get("/products/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const product = products.find((p) => p.id === id);

    if (!product) {
      return res
        .status(200)
        .json({ success: false, message: "Product not found!" });
    }

    return res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
});

// create new product
app.post("/products", (req, res, next) => {
  try {
    const { name, price, quantity } = req.body;
    if (!name || !price || !quantity) {
      return res.status(400).json({
        success: false,
        message: "name, price and quantity are required!",
      });
    }

    const productId = String(Date.now());

    const newProduct = {
      id: productId,
      name: name,
      price: price,
      quantity: quantity,
    };

    products.push(newProduct);
    return res.status(200).json({ success: true, newProduct });
  } catch (error) {
    next(error);
  }
});

// update a product
app.put("/products/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, quantity } = req.body;
    const product = products.find((p) => p.id === id);

    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found" });
    }

    if (!name || !price || !quantity) {
      return res.status.json({
        success: false,
        message: "name, price and quantity are required!",
      });
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    return res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
});

app.delete("/products/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found!" });
    }

    products.splice(index, 1);
    return res
      .status(200)
      .json({ success: true, message: "Product deleted!!!" });
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  return res.status(500).json({
    error: "Something went wrong on the server...",
    message: err.message,
  });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT} 🟢`);
});
