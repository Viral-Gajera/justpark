let mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

async function query(query, value = []) {
    const [results] = await pool.execute(query, value);
    return results;

    /*
        Return 
        SELECT -> array of object
        INSERT -> insertId, affectedRows
        UPDATE -> affectedRows
        DELETE -> affectedRows
    */
}

module.exports = query;
