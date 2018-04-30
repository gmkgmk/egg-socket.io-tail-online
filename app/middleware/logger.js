'use strict';

const { Logger } = require('egg-logger');
module.exports = () => {
  return async function accessLogger(ctx, next) {
    await next()
  }
}