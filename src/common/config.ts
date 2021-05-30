const dotenv = require('dotenv');
const pathModule = require('path');

dotenv.config({
  path: pathModule.join(__dirname, '../../.env'),
});

module.exports = {
  PORT: process?.env?..PORT,
  NODE_ENV: process?.env?..NODE_ENV,
  MONGO_CONNECTION_STRING: process?.env?..MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process?.env?..JWT_SECRET_KEY,
  AUTH_MODE: process?.env?..AUTH_MODE === 'true',
};
