module.exports = app => {
  return async (ctx, next) => {
    // const user = await ctx.service.user.create();
    const user={
      key:'41be203b-4a2b-487b-b136-d197e03b8225',
      name:'正在睡觉',
      avatar:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png	"		
    }
    
    const message = {
      type: "userInfo",
      user
    };
    ctx.socket.emit("userInfo", message);
    await next();

    console.log('disconnection!');
  };
};