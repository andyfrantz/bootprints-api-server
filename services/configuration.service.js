require('dotenv').config();
const params = require('../constants/default.config');

class ConfigurationService {
  #settings = {};

  constructor() {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(params.optionalConfig)) {
      this.#settings[key] = process.env[key] || value;
    }

    Object.keys(params.requiredConfig).forEach((key) => {
      if (process.env[key]) {
        this.#settings[key] = process.env[key];
      } else {
        throw new Error(`Fatal error: missing required configuration parameter -> ${key}`);
      }
    });
  }

  get(key) {
    return this.#settings[key];
  }
}

module.exports = new Proxy(new ConfigurationService(), {
  get(target, prop, receiver) {
    // eslint-disable-next-line no-void
    void receiver;
    return target.get(prop);
  },
});
