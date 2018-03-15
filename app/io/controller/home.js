'use strict';

const Controller = require('egg').Controller;

class DefaultController extends Controller {
  async index() {
    const { ctx } = this;
    const message = ctx.args[0];
    await ctx.socket.emit('server:userInfo', message);
  }
  async message(){
    const { ctx, app } = this;
    const message = ctx.args[0];
    await ctx.socket.server.local.emit('server:message', message);
  }
}

module.exports = DefaultController;
