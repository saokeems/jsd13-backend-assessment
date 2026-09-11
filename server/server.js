import express from "express";
import cors from "cors";
import { products } from "./fakeDB/fakeProducts.js";

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()} ] ${req.method} ${req.url}`);
  next();
});

// get all products
app.get("/products", (req, res, next) => {
  try {
    const { name, sortBy, order } = req.query;
    let result = [...products];

    if (name) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(name.toLowerCase()),
      );
    }

    if (sortBy === "price") {
      result.sort((a, b) => {
        if (order === "desc") {
          return b.price - a.price;
        }
        return a.price - b.price;
      });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
});

// get a product
app.get("/products/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const product = products.find((p) => p.id === id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found!" });
    }

    return res.status(200).json({ success: true, data: product });
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
    return res.status(201).json({ success: true, data: newProduct });
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
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    if (!name || !price || !quantity) {
      return res.status(400).json({
        success: false,
        message: "name, price and quantity are required!",
      });
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    return res.status(200).json({ success: true, data: product });
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
        .status(404)
        .json({ success: false, message: "Product not found!" });
    }

    const deletedProduct = products.splice(index, 1);
    return res.status(200).json({
      success: true,
      message: "Product deleted!!!",
      data: deletedProduct,
    });
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
