'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async privateChannel() {
    const { ctx, app } = this;
    const message = ctx.args[0];
    const { data: { payload } } = message;
    const { pid, message: payloadMessage, person: { pid: userPid } } = payload;

    // 将消息加入数据库/缓存
    await ctx.service.message.insertMessage({ pid, payloadMessage, userPid })


    const toUser = await ctx.service.user.findUserById(pid)
    if (toUser && !toUser.online) {
      // 如果不在线
      return
    }
    const { clientId } = toUser;
    const toSocket = ctx.socket.server.sockets.sockets[clientId];
    const msg = ctx.helper.parseMsg("server:privateChannel", { message: { data: payloadMessage, userPid }, person: toUser })
    toSocket.emit(`server:privateChannel`, msg);
  }
}

module.exports = HomeController;
