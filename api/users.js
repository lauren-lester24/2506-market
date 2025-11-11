import express from "express";





import { createUser, getUserByUsername } from "#db/queries/users";
import { createToken } from "#utils/jwt";

import requireBody from "#middleware/requireBody"

const router = express.Router();


router.post(
    "/register",
    requireBody(["username", "password"]),
    async(req, res) => {
        const { username, password } = req.body;
        const user = await createUser(username, password);

        const token = await createToken({ id: user.id });
        res.status(201).send(token);
    }
);


router.post(
    "/login",
    requireBody(["username", "password"]),
    async (req, res) => {
        try {
             const {username, password} = req.body;
        const user = await getUserByUsernameAndPassword(username, password);


        if (!user) {
            return res.status(401).send("Invalid Username or Password.");
        }
const token = await createToken({ id: user.id });
res.send(token);
        } catch (error) {
            console.error("Error getting token", error);
        }
       
    }
)









export default router;
