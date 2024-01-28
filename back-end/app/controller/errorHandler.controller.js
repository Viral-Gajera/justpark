function errorHandler(err, req, res, next) {
    res.set("status", "500");
    res.json({
        isSuccess: false,
        message: `${err.message}`,
        callstack: `${err.callstack}`,
        data: {},
    });
}

module.exports = { errorHandler };
