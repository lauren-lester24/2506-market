import express from "express";
import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

const router = express.Router();

import { 
    createOrder, 
    getOrdersByUsers, 
    getOrderById
} from "#db/queries/orders";
import { getProductById } from "#db/queries/products";
import { addProductToOrder, getProductByOrderId } from "#db/queries/orders_products";

router.post("/",
    requireUser,
    requireBody(["date"]),
    async (req, res) => {
        try {
            const { date, note } = req.body;
         
    
            const newOrder = await createOrder({
                date,
                note,
           userId: req.user.id
            });

            res.status(201).send(newOrder);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }
);


router.get("/", 
   requireUser,
    async (req, res) => {
        try {
            const userId = req.user.id;
            const orders = await getOrdersByUsers(userId);

            res.status(200).send(orders);
        } catch (error) {
            console.error(error);
              res.status(500).send("Internal Server Error");
        }

});

//get /orders:id

router.get("/:id", 
    requireUser,
    async (req, res) => {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            // find the order
            const order = await getOrderById(id);

            // if no order found -> 404
            if (!order) {
                return res.status(404).send("Order not found.");
            }

            // If order belongs to another user->
            if (order.user_id !== userId) {
                return res.status(403).send("Forbidden");
            }

            //Otherwise, send it back
            res.status(200).send(order);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }
);

router.post(
"/:id/products",
requireUser,
requireBody(["productId", "quantity"]),
async (req, res) => {
    try {
        const { id } = req.params; 
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        //Check if the order exist
        const order = await getOrderById(id);
        if(!order) {
            return res.status(404).send("Order not found.");
        }
            //Check if this order belongs to the logged-in user
            if (order.user_id !== userId) {
                return res.status(403).send("Error: Not your order.");
            }

            //Check if the product exists
            const product = await getProductById(productId);
                if (!product) {
                    return res.status(400).send("Product not found.");
                }

                //Add the product to the order
                const addedProduct = await addProductToOrder({
                    orderId: id,
                    productId,
                    quantity
                });

                res.status(201).send(addedProduct);
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/:id/products", 
    requireUser,
    async (req, res) => {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            //check if order exist
            const order = await getOrderById(id);
            if(!order) {
                return res.status(404).send("Order not found.");
            }

            if (order.user_id !== userId) {
                return res.status(403).send("Error: Not your order");
            }

            // Get all products in this order
            const products = await getProductByOrderId(id);

            res.status(200).send(products);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }
);



export default router;