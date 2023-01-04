const http = require('http');

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

const MongoDbService = require("./services/mongodb.service");
const invalidPathHandler = require('./middleware/invalidPathHandler.middleware');
const errorResponseHandler = require('./middleware/errorResponseHandler.middleware');

try {
    const ConfigService = require('./services/configuration.service');

// connect to mongoDb cluster
    MongoDbService.connect(ConfigService.MONGODB_DSN);

// create app
    const app = express();

// register helpers
    app.use(helmet());
    app.use(cors());
    app.use(morgan(ConfigService.LOGGING_FORMAT));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

// Add routes
    app.use('/', require('./routes'));

// Attach Error handling Middleware
    app.use(invalidPathHandler);
    app.use(errorResponseHandler);

// create server
    const server = http.createServer(app);
    server.listen(ConfigService.SERVER_PORT);
} catch (ex) {
    console.error(ex.message);
    process.exit(1);
}
