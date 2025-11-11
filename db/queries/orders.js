import db from "#db/client";

export async function createOrder(userId, date, note) {
const sql = `
INSERT INTO orders
(user_id, date, note)
VALUES
($1, $2, $3)
RETURNING *
`;
const {
    rows: [order],
} = await db.query(sql, [userId, date, note]);
return order;
}
