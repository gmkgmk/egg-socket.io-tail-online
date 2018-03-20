'use strict';

const Controller = require("../core/base_controller");

class SessionController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.UserRule = {
      username: { type: 'string', required: true, allowEmpty: false },
      password: { type: 'password', required: true, allowEmpty: false, min: 6 }
    };
  }
  // 登陆
  async create() {
    const { ctx, service } = this;

    const params = ctx.request.body;

    // const userInfo = {
    //   key: '41be203b-4a2b-487b-b136-d197e03b8225',
    //   name: '正在睡觉3',
    //   avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png	"
    // }
    ctx.validate(this.UserRule);
    const findUser = await service.user.findUser(params.username);
    if (!findUser) {
      this.fail({
        res: {
          message: "该用户不存在"
        }
      })
      return;
    }

    const result = await service.session.findUserWithPsw(params);
    if (result) {
      this.success({
        res: result
      })
      ctx.session.userInfo = result
    } else {
      this.fail({
        res: {
          message: "密码错误,请确认后重试"
        }
      })
    }

  }
  //验证登陆session
  async index() {
    const { ctx, service } = this;
    if (ctx.session.userInfo) {
      this.success({
        res: ctx.session.userInfo
      })
    } else {
      this.fail({})
    }
  }
  async destroy() {
    const { ctx, service } = this;
    ctx.session.userInfo = null;
    this.success({
      res: {
        message:"退出成功"
      }
    })
  }
}

module.exports = SessionController;