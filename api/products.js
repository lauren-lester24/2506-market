import express from "express";

const router = express.Router();

import { getProducts } from "#db/queries/products";



router.get("/", async (req, res) => {
const products = await getProducts();
res.send(products);

});










export default router;