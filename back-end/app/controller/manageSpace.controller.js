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
    let rentDetails;
    if (req.body.edit) {
        // get rent details
        // rentDetails = await query(
        //     "SELECT * FROM rent_details WHERE providerId = ?",
        //     [req.body.providerId]
        // );

        // let result = await query(
        //     "DELETE FROM space_provider WHERE providerId = ?",
        //     [req.body.providerId]
        // );

        // if (!result.affectedRows) {
        //     res.json({
        //         isSuccess: false,
        //         message: "Something went wrong",
        //         data: {},
        //     });
        // }

        // Update table with new data
        let result = await query(
            "UPDATE space_provider SET fullName = ?, spaceName = ?, email = ?, password = ?, phoneNo = ?, latitude = ?, longitude = ?, `from` = ?, `to` = ?, maxSpace = ?, ratePerHour = ?, fileUrls = ?, status = ? WHERE providerId = ?",
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
                req.body.providerId,
            ]
        );

        if (result.affectedRows) {
            res.json({
                isSuccess: true,
                message: "Account updated successfully",
                data: {
                    providerId: req.body.providerId,
                    ...req.body,
                },
            });
        }
        return;
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

    // if (req.body.edit) {
    //     // update rent details with new providerId
    //     for (let i = 0; i < rentDetails.length; i++) {
    //         await query(
    //             "INSERT INTO rent_details (providerId, renterId, spaceId, fromTime, toTime, date, status) VALUES (?, ?, ?, ?, ?, ?, ?);",
    //             [
    //                 result.insertId,
    //                 rentDetails[i].renterId,
    //                 rentDetails[i].spaceId,
    //                 rentDetails[i].fromTime,
    //                 rentDetails[i].toTime,
    //                 rentDetails[i].date,
    //                 rentDetails[i].status,
    //             ]
    //         );
    //     }
    // }

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
        "SELECT * FROM rent_details JOIN space_renter ON rent_details.renterId = space_renter.renterId WHERE providerId = ?",
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
