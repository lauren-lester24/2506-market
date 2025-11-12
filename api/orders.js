import express from "express";
import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

const router = express.Router();

import { createOrder } from "#db/queries/orders";

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
)







// router.get("/", async (req, res) => {
// const orders = await getOrders();
// res.send(orders);

// })





export default router;