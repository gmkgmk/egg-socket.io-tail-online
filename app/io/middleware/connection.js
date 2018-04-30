module.exports = app => {
  return async (ctx, next) => {
    const { app, socket, logger, helper, session, service } = ctx;
    const id = socket.id;
    const nsp = app.io.of('/');
    const query = socket.handshake.query;

    // 登录更新状态
    const userConnect = async user => {
      let userInfo = await service.session.registerClient(user.pid, id);

      const { friendList } = userInfo;
      if (friendList) {
        const userList = friendList.split(",");
        const res = await ctx.service.friends.findAllFriend(userList);
        userInfo.friendList = res;
      }
      return helper.parseMsg("userInfo", { userInfo });
    }

    let user = session.userInfo;
    // 没有session就返回
    if (!user) {
      return
    }

    const msg = await userConnect(user)
    socket.emit('userInfo', msg);

    await next();

    await service.session.exitClient(user.pid);
  }
}