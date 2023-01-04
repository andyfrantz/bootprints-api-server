const apiApp = require('../package.json');
const MongoDbService = require('../services/mongodb.service');

/**
 * Handle get status request.
 *
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
exports.getStatusHandler = (req, res) => {
    const { readyState } = MongoDbService.db;
    const sCode = readyState === 1 ? 200 : 500;
    let message = 'SERVICE_IS_READY';
    if (readyState === 0 || readyState === 3) {
        message = 'DATABASE_CONNECTION_LOST';
    } else if (readyState === 2) {
        message = 'DATABASE_CONNECTION_NOT_READY';
    }

    res.status(sCode).json({
        message,
    });
};

/**
 * Handle get status HEAD request.
 *
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
exports.headStatusHandler = (req, res) => {
    res.status(200).end();
};

/**
 * Handle get info request.
 *
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
exports.getInfoHandler = (req, res) => {
    res.status(200).json({
        name: apiApp.name,
        version: apiApp.version,
    });
};

/**
 * Handle get metrics request.
 *
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
exports.getMetricsHandler = (req, res) => {
    res.status(200).json({
        mem: process.memoryUsage(),
        uptime: process.uptime(),
    });
};
