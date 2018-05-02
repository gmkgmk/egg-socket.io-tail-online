module.exports = app => {
  return async (ctx, next) => {
    const { app, socket, logger, helper, session, service } = ctx;
    const id = socket.id;
    const nsp = app.io.of('/');
    const query = socket.handshake.query;

    let user = session.userInfo;
    // 登录更新状态
    const userConnect = async user => {
      let userInfo = await service.session.registerClient(user.pid, id);

      const { friendList } = userInfo;
      if (friendList) {
        const userList = friendList.split(",");
        const res = await ctx.service.friends.findAllFriend(userList);
        userInfo.friendList = res;
      }
      return userInfo
    }

    // 没有session就返回
    if (!user) {
      socket.emit('userInfo', helper.parseMsg("userInfo", { userInfo: {} }));
      return
    }

    const userInfo = await userConnect(user);
    const msg = helper.parseMsg("userInfo", { userInfo });
    socket.emit('userInfo', msg);
    const connectUser = helper.parseMsg("connect", { friend: userInfo })
    socket.broadcast.emit("friendConnect", connectUser);

    // 在线列表
    // nsp.adapter.clients(['/'], (err, clients) => {
    //   logger.debug('#online_join', clients);

    //   // 更新在线用户列表
    //   nsp.to('/').emit('online', {
    //     clients,
    //     action: 'join',
    //     target: 'participator',
    //     message: `User(${id}) joined.`,
    //   });
    // });
    await next();


    await service.session.exitClient(user.pid);
    // 下线通知好友
    socket.broadcast.emit("friendDisconnect", helper.parseMsg("friendDisconnect", user));
  }
}