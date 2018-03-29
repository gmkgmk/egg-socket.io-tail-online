'use strict';

const Controller = require('egg').Controller;

class DefaultController extends Controller {
  async index() {
    const { ctx } = this;
    const message = ctx.args[0];
    await ctx.socket.emit('server:userInfo', message);
  }
  async message() {
    const { ctx, app } = this;
    const message = ctx.args[0];
    await ctx.socket.server.local.emit('server:message', message);
  }
  async privateChat() {
    // const  id = "47518146-ef44-4538-869d-64cc15deb957";
    const { ctx } = this;
    const message = ctx.args[0];
    console.log("message",ctx.args)
    const id = message.toId;
    const toSocket = ctx.socket.server.sockets.sockets[id];
    toSocket.emit(`server:private_chat`, message);
    // console.log(message.toId)
    // await ctx.socket.emit(`server:private_chat:${message.toId}`, message);
  }
}

module.exports = DefaultController;
