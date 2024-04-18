let query = require("../model/db.js");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const fs = require("fs");
const ejs = require("ejs");
const path = require("path");
const nodemailer = require("nodemailer");

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
    console.log(req.body);

    let result = await query(
        "SELECT * FROM space_provider WHERE (ABS(latitude - ?) < 0.3 OR ABS(longitude - ?) < 0.3) AND status = 1 AND TIME(STR_TO_DATE(?, '%Y-%m-%dT%H:%i')) >= `from` AND TIME(STR_TO_DATE(?, '%Y-%m-%dT%H:%i')) <= `to`;",
        [req.body.latitude, req.body.longitude, req.body.from, req.body.to]
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
    const existingUser = await query(
        "SELECT * FROM space_renter WHERE email = ?;",
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

async function createSession(req, res) {
    let from = Date.parse(req?.body?.from);
    let to = Date.parse(req?.body?.to);

    let hours = Number(((to - from) / (10 * 60 * 60)).toFixed(0));
    let ratePerHour = req?.body?.ratePerHour;

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "INR",
                    product_data: {
                        name: "Book Parking Spot",
                    },
                    unit_amount: hours * ratePerHour,
                },
                quantity: 1,
            },
        ],
        metadata: req.body,
        mode: "payment",
        success_url: "http://localhost:3000?status=1",
        cancel_url: "http://localhost:3000?status=0",
    });

    res.json({ id: session.id });
}

async function verifyPayment(req, res) {
    const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.log(err);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    if (event.type === "checkout.session.completed") {
        console.log("Payment was successful!");

        // mail();

        const data = event.data.object.metadata;

        mail(
            event.data.object.customer_details.email,
            event.data.object.amount_subtotal / 100
        );

        let result = await query(
            "INSERT INTO rent_details (providerId, renterId, spotIndex, `from`, `to`, vehicleNo) VALUES (?, ?, ?, ?, ?, ?);",
            [
                data.providerId,
                data.renterId,
                data.spotIndex,
                data.from,
                data.to,
                data.vehicleNo,
            ]
        );
        if (result.affectedRows) {
            res.send();
        }
    }
}

function mail(to = "viral.gajera218@gmail.com", amount = 0.0) {
    // Read the content of index.html
    const htmlTemplate = fs.readFileSync(
        path.join(__dirname, "../mail/index.html"),
        "utf-8"
    );

    // Render the HTML content with EJS
    const renderedHtml = ejs.render(htmlTemplate, { paymentAmount: amount });

    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: {
            name: "Team JustPark",
            address: process.env.EMAIL_USER,
        },
        to,
        subject: "JustPark - Booking Confirmation",
        // text: "Hello world?",
        html: renderedHtml,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent:", info.response);
        }
    });
}

module.exports = {
    addUser,
    login,
    getMarker,
    bookTicket,
    booked,
    history,
    createSession,
    verifyPayment,
};
