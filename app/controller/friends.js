'use strict';

const Controller = require("../core/base_controller");

class FriendsController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.UserRule = {
      username: { type: 'string', required: true, allowEmpty: false },
      password: { type: 'password', required: true, allowEmpty: false, min: 6 }
    };

    this.UseIdrRule = {
      id: { type: 'string', required: true, allowEmpty: false }
    };
  }
  async index() {
    const { ctx, service } = this;
    this.success({ res: result })
  }
  /**
 * 根据id查找用户
 */
  async show() {
    const { ctx, service } = this;
    ctx.validate(this.UseIdrRule, ctx.params)
    const { params: { id = 0 } } = ctx;
    const userResult = await service.user.findUserById(id);
    if (!userResult) {
      this.fail({
        res: {
          message: "查找失败,没有查找到该用户"
        }
      })
      return
    }
    const userlist = userResult.friendList.split(",");
    const res = await service.friends.findAllFriend(userlist);
    this.success({ res })
  }
}

module.exports = FriendsController;
