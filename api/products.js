import express from "express";
import requireUser from "#middleware/requireUser";
const router = express.Router();

import { 
    getProducts,
     getProductById,
    getOrdersByProductIdAndUser
    } from "#db/queries/products";




router.get("/", async (req, res) => {
    try {
const products = await getProducts();
  res.status(200).send(products);
    } catch (error) {
        console.error(error);
        res.status(500).send("Iternal Server Error");
    }
});

// Attach router.param to handle :id automatically
router.param("id", async (req, res, next, id) => {
    try {
        const product = await getProductById(id);
        if (!product) return res.status(404).send("Product Not Found");
        req.product = product;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// GET /products/:id
router.get("/:id", (req, res) => {
    res.status(200).send(req.product);
});

// GET /products/:id/orders
router.get("/:id/orders", requireUser, async (req, res) => {
    try {
        const product = req.product;
        
        const orders = await getOrdersByProductIdAndUser(product.id, req.user.id);
        res.status(200).send(orders);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});



export default router;