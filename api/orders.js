import express from "express";
import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

const router = express.Router();

import { createOrder } from "#db/queries/orders";
import { getOrdersByProductIdAndUser } from "#db/queries/products";

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





export default router;