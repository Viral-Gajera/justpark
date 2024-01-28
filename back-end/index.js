require("dotenv").config();

let cors = require("cors");
let express = require("express");
let router = require("./app/router/router.js");

let counter = 0;
let app = express();

app.use(
    cors({
        origin: "*",
    })
);
app.use(express.json());
app.use(function (req, res, next) {
    console.log(`${counter++}. ${req.method} ${req.url}`);
    console.log(req.body);
    next();
});

// Serve static files
app.use(express.static("public"));
app.use("/", router);

app.listen(8080, function () {
    console.log("App listening on port 8080...");
});
