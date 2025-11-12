import db from "#db/client";

export async function createProduct (title, description, price) {
    const sql = `
    INSERT INTO products
    (title, description, price)
    VALUES
     ($1, $2, $3)
     RETURNING *
    `;
    const {
        rows: [product],
    } = await db.query(sql, [title, description, price]);
    return product;
}

export async function getProducts() {
    try {
    const sql = `
    SELECT *
    FROM products 
    `
    const { rows: products } = await db.query(sql);
    return products;

    } catch (error) {
        console.error("Error Fetching Products");
    }
}

export async function getProductById(id) {

 try {
    const sql = `
    SELECT *
    FROM products
    WHERE id = $1
    `;
    const {
        rows: [product],
         } = await db.query(sql, [id]);
        return product || null;
   
}  catch (error) {
        console.error("Error Fetching Product by ID.", error);
}
}

export async function getOrdersByProductIdAndUser(productId, userId) {
    try {
        const sql = `
        SELECT orders.*
        FROM orders
        JOIN orders_products ON orders.id = orders_products.order_id
        WHERE orders_products.product_id = $1
         AND orders.user_id = $2
        `;
        const { rows: orders } = await db.query(sql, [productId, userId]);
        return orders;
    } catch (error) {
        console.error("Error Fetching Orders for Product");
    throw error;
    }
}
