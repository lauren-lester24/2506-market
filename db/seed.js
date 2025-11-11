import db from "#db/client";

import { createProduct } from "#db/queries/products";
import { addProductToOrder } from "#db/queries/orders_products";
import { createOrder } from "#db/queries/orders";
import { createUser } from "#db/queries/users";




await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO
  for (let i = 1; i <= 10; i++) {
    await createProduct(
      "Product" + i, 
      "Description for Product" + i,
      i * 100
    );
  }
  const user = await createUser("Eagles", "EaglesRock");

  const order = await createOrder(user.id, "2025-11-10", "First Order");


  for (let i = 1; i <= 5; i++) {
await addProductToOrder(order.id, i, 1);
  }
  
}
