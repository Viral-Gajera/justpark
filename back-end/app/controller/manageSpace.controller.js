let query = require("../model/db.js");

async function login(req, res) {
    let result = await query(
        "SELECT * FROM space_provider WHERE email = ? AND password = ?",
        [req.body.email, req.body.password]
    );
    if (result.length) {
        res.json({
            isSuccess: true,
            message: "Login successfully",
            data: {
                ...result[0],
            },
        });
    } else {
        res.json({
            isSuccess: false,
            message: "Invalid email or password",
            data: {},
        });
    }
}

async function addUser(req, res) {
    if (req.body.edit) {
        // Check if space is already booked
        // Do not allow to edit if space is already booked

        // code here

        // end

        let result = await query(
            "DELETE FROM space_provider WHERE providerId = ?",
            [req.body.providerId]
        );

        if (!result.affectedRows) {
            res.json({
                isSuccess: false,
                message: "Something went wrong",
                data: {},
            });
        }
    }

    const existingUser = await query(
        "SELECT * FROM space_provider WHERE email = ?;",
        [req.body.email]
    );

    if (existingUser.length > 0) {
        // If the email already exists, send a duplicate_email response
        return res.json({
            isSuccess: false,
            message: "duplicate_email",
        });
    }

    let result = await query(
        "INSERT INTO space_provider (fullName, spaceName, email, password, phoneNo, latitude, longitude, `from`, `to`, maxSpace, ratePerHour, fileUrls, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [
            req.body.fullName,
            req.body.spaceName,
            req.body.email,
            req.body.password,
            Number(req.body.phoneNo),
            req.body.latitude,
            req.body.longitude,
            req.body.from,
            req.body.to,
            Number(req.body.maxSpace),
            Number(req.body.ratePerHour),
            JSON.stringify(req.body.fileUrls),
            0,
        ]
    );
    if (result.affectedRows) {
        res.json({
            isSuccess: true,
            message: "Account created successfully",
            data: {
                providerId: result.insertId,
                ...req.body,
            },
        });
    }
}

async function rentDetails(req, res) {
    let result = await query(
        "SELECT * FROM rent_details WHERE providerId = ?",
        [req.body.providerId]
    );
    if (result.length) {
        res.json({
            isSuccess: true,
            message: "Rent details fetched",
            data: result,
        });
    } else {
        res.json({
            isSuccess: false,
            message: "No rent details found",
            data: {},
        });
    }
}

module.exports = { addUser, login, rentDetails };
