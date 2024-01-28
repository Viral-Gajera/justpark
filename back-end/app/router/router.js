/* eslint-disable prettier/prettier */

let express = require("express");
const path = require("path");
let router = express.Router();

// Import Controllers
let manageSpaceController = require("../controller/manageSpace.controller");
let rentSpaceController = require("../controller/rentSpace.controller");
let adminController = require("../controller/admin.controller");
let fileUploadController = require("../controller/fileUpload.controller");
let errorHandlerController = require("../controller/errorHandler.controller");

// Manage Space
router.post("/api/manage-space/login", manageSpaceController.login);
router.post("/api/manage-space/add-user", manageSpaceController.addUser);
router.post("/api/manage-space/get-rent-details", manageSpaceController.rentDetails);

// Rent Space
router.post("/api/rent-space/login", rentSpaceController.login);
router.post("/api/rent-space/add-user", rentSpaceController.addUser);
router.post("/api/rent-space/get-marker", rentSpaceController.getMarker);
router.post("/api/rent-space/book-ticket", rentSpaceController.bookTicket);
router.post("/api/rent-space/booked", rentSpaceController.booked);
router.post("/api/rent-space/history", rentSpaceController.history);


// Admin
router.post("/api/admin/login", adminController.login);
router.post("/api/admin/change-status", adminController.changeStatus);

// File upload
router.post("/api/upload", fileUploadController.uploadMiddleware, fileUploadController.uploadHandler);
router.get("/*", (req, res) => { res.sendFile(path.join(__dirname, "../../public/", "index.html")); });

router.use(errorHandlerController.errorHandler);

module.exports = router;
