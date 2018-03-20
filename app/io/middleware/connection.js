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
    const { id } = ctx.socket;
    userInfo.socketId = id;
    ctx.socket.emit("userInfo", userInfo);

    const { friendList } = userInfo;
    if (friendList) {
      const userlist = friendList.split(",");
      const res = await ctx.service.friends.findAllFriend(userlist);
      ctx.socket.emit("server:friendList", res);
    }

    await next();

  };
};