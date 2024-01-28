let query = require("../model/db.js");

async function login(req, res) {
    let result = await query(
        "SELECT * FROM space_renter WHERE email = ? AND password = ?",
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

async function getMarker(req, res) {
    let result = await query(
        "SELECT * FROM space_provider WHERE (ABS(latitude - ?) < 0.3 OR ABS(longitude - ?) < 0.3) AND status = 1;",
        [req.body.latitude, req.body.longitude]
    );

    let filterted = await filterMarker(result);

    if (filterted.length) {
        res.json({
            isSuccess: true,
            message: "Marker successfully fetched",
            data: filterted,
        });
    } else {
        res.json({
            isSuccess: false,
            message: "No marker found",
            data: [],
        });
    }

    async function filterMarker(result) {
        let filterted = [];

        for (let i = 0; i < result.length; i++) {
            console.log(result[i].providerId, req.body.from, req.body.to);
            let spotIndexs = await query(
                "SELECT spotIndex FROM rent_details WHERE providerId = ? AND STR_TO_DATE(?, '%Y-%m-%dT%H:%i') < `to` AND STR_TO_DATE(?, '%Y-%m-%dT%H:%i') > `from`;",
                [result[i].providerId, req.body.from, req.body.to]
            );

            let maxSpace = result[i].maxSpace;

            let spaceDestribution = [];

            for (let j = 0; j < spotIndexs.length; j++) {
                spaceDestribution[spotIndexs[j].spotIndex] = 1;
            }

            for (let j = 0; j < maxSpace; j++) {
                if (spaceDestribution[j] != 1) {
                    filterted.push({
                        ...result[i],
                        availableSpotIndex: j,
                    });
                    break;
                }
            }
        }

        return filterted;
    }
}

async function addUser(req, res) {
    let result = await query(
        "INSERT INTO space_renter (userName, email, password, phoneNo) VALUES (?, ?, ?, ?);",
        [req.body.fullName, req.body.email, req.body.password, req.body.phoneNo]
    );
    if (result.affectedRows) {
        res.json({
            isSuccess: true,
            message: "Account created successfully",
            data: {
                id: result.insertId,
                ...req.body,
            },
        });
    }
}

async function bookTicket(req, res) {
    let result = await query(
        "INSERT INTO rent_details (providerId, renterId, spotIndex, `from`, `to`, vehicleNo) VALUES (?, ?, ?, ?, ?, ?);",
        [
            req.body.providerId,
            req.body.renterId,
            req.body.spotIndex,
            req.body.from,
            req.body.to,
            req.body.vehicleNo,
        ]
    );
    if (result.affectedRows) {
        res.json({
            isSuccess: true,
            message: "Account created successfully",
            data: {
                id: result.insertId,
                ...req.body,
            },
        });
    }
}

async function booked(req, res) {
    let result = await query(
        "SELECT B.fullName, B.spaceName, B.phoneNo, B.ratePerHour, B.email, A.from, A.to, A.vehicleNo FROM rent_details A JOIN space_provider B ON A.providerId = B.providerId WHERE A.renterId = ? AND A.to > NOW();",
        [req.body.renterId]
    );

    console.log(result);

    if (result.length) {
        res.json({
            isSuccess: true,
            message: "Parking Booked data fetched successfully",
            data: result,
        });
    }
}

async function history(req, res) {
    let result = await query(
        "SELECT B.fullName, B.spaceName, B.phoneNo, B.ratePerHour, B.email, A.from, A.to, A.vehicleNo FROM rent_details A JOIN space_provider B ON A.providerId = B.providerId WHERE A.renterId = ? AND A.to < NOW();",
        [req.body.renterId]
    );

    console.log(result);

    if (result.length) {
        res.json({
            isSuccess: true,
            message: "Parking Booked data fetched successfully",
            data: result,
        });
    }
}

module.exports = { addUser, login, getMarker, bookTicket, booked, history };
