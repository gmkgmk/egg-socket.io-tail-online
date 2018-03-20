module.exports = app => {
  return async (ctx, next) => {
    // const { key } = ctx.req._query;
    // const userResult = await ctx.service.user.findUserById(key);
    // if(userResult){
    //   const userlist = userResult.friendList.split(",");
    //   const res = await ctx.service.friends.findAllFriend(userlist);
    //   ctx.socket.emit("userList", res);
    // }

    // 发送私聊
    let userInfo = ctx.session.userInfo;
    ctx.socket.emit("userInfo", userInfo);


    let user = await ctx.service.session.registerClient(userInfo.pid, ctx.socket.id);
    ctx.socket.broadcast.emit("server:updateFriend", user);

    const { friendList } = userInfo;
    if (friendList) {
      const userlist = friendList.split(",");
      const res = await ctx.service.friends.findAllFriend(userlist);
      ctx.socket.emit("server:friendList", res);
    }



    await next();

    // 用户下线,清除客户端id
    user = await ctx.service.session.exitClient(userInfo.pid);
    ctx.socket.broadcast.emit("server:updateFriend", user);
  };
};