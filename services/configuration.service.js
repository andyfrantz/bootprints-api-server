require('dotenv').config();
const params = require('../constants/default.config');

class ConfigurationService {
    constructor() {
        this._settings = {};

        for (const [key, value] of Object.entries(params.optionalConfig)) {
            this._settings[key] = process.env[key] || value;
        }

        Object.keys(params.requiredConfig).forEach(key => {
            if (process.env[key]) {
                this._settings[key] = process.env[key];
            } else {
                throw new Error(`Fatal error: missing required configuration parameter -> ${key}`);
            }
        });
    }

    get(key) {
        return this._settings[key];
    }
}

module.exports = new Proxy(new ConfigurationService(), {
    get(target, prop, receiver) {
        return target.get(prop);
    }
});
