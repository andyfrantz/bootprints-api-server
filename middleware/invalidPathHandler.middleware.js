// Fallback Middleware function for returning
// 404 error for undefined paths
module.exports = (req, res, next) => {
    res.status(404).end();
};
