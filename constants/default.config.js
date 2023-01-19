const NOT_DEFINED = 'NOT_DEFINED';

const optionalConfig = {
  SERVER_PORT: 3000,
  LOGGING_FORMAT: 'dev',
};

const requiredConfig = {
  JWT_KEY: NOT_DEFINED,
  MONGODB_DSN: NOT_DEFINED,
};

module.exports = {
  optionalConfig,
  requiredConfig,
};
