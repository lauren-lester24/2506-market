
import express from "express";
import usersRouter from "#api/users";
import ordersRouter from "#api/orders";
import productsRouter from "api/products";
import getUserFromToken from "#middleware/getUserFromToken";

const app = express();

app.use(express.json());
app.use(getUserFromToken);

app.use("/users", usersRouter);
app.use("/orders", ordersRouter);
app.use("/products", productsRouter);











export default app;
