const merge = require('webpack-merge');

const configConfig = require('./config/webpack.config.js');
const migrateConfig = require('./migrate/webpack.config.js');

module.exports = merge(baseConfig,migrateConfig);

