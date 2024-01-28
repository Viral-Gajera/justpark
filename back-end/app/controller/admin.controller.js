let query = require("../model/db.js");

async function login(req, res) {
    let result = await query(
        "SELECT * FROM admin WHERE email = ? AND password = ?",
        [req.body.email, req.body.password]
    );
    if (result.length) {
        let data = await query("SELECT * FROM space_provider WHERE status=0");

        res.json({
            isSuccess: true,
            message: "Login successfully",
            data: data,
        });
    } else {
        res.json({
            isSuccess: false,
            message: "Invalid email or password",
            data: {},
        });
    }
}

async function changeStatus(req, res) {
    let result = await query(
        "UPDATE space_provider SET status = ? WHERE providerId = ?",
        [req.body.status, req.body.id]
    );
    if (result.affectedRows) {
        res.json({
            isSuccess: true,
            message: "Status changed successfully",
            data: {},
        });
    } else {
        res.json({
            isSuccess: false,
            message: "Something went wrong",
            data: {},
        });
    }
}

module.exports = { login, changeStatus };
