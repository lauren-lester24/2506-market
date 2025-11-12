import db from "#db/client";

export async function createOrder({ date, note, userId }) {
const sql = `
INSERT INTO orders
(date, note, user_id)
VALUES
($1, $2, $3)
RETURNING *
`;
const {
    rows: [order],
} = await db.query(sql, [date, note, userId]);
return order;
}

export async function getOrdersByUsers(userId) {
    const sql = `
    SELECT * FROM orders
    WHERE user_id = $1
    ORDER BY date DESC;
    `;
    const { rows } = await db.query(sql, [userId]);
    return rows;
}

export async function getOrderById(id) {
    const sql = `
    SELECT * FROM orders
    WHERE id = $1
    `;
    const { rows } = await db.query(sql, [id]);
    return rows[0];
}