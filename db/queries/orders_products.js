import db from "#db/client";

export async function addProductToOrder({orderId, productId, quantity}) {
    const sql = `
    INSERT INTO orders_products
    (order_id, product_id, quantity)
    VALUES
    ($1, $2, $3)
    RETURNING *
    `;
    const {
        rows: [productOrders],
    } = await db.query( sql, [orderId, productId, quantity]);
    return productOrders;
}

export async function getProductByOrderId(orderId) {

    const sql = `
   SELECT 
    products.id,
    products.title,
    products.description,
    products.price,
    orders_products.quantity
FROM orders_products
JOIN products
ON orders_products.product_id = products.id
WHERE orders_products.order_id = $1;

    `
    const { rows } = await db.query(sql, [orderId]);
    return rows;
}