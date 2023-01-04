// Error handling Middleware function reads the error message
// and sends back a response in JSON format

module.exports = (err, req, res, next) => {
    void next;

    res.status(err.statusCode || 500).json({
        message: err.message
    });
};
