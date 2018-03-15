const { Controller } = require('egg');
class BaseController extends Controller {
  success({res = null, code = 200, status = true}) {
    const {ctx} = this;
    ctx.body = {
      success: status,
      code,
      data:res,
    };
    ctx.status = 200
  }

  fail({ res = null, code = 0, status = false }) {
    const {ctx} = this;
    ctx.body = {
      success: status,
      code,
      data: res,
    }
  }

  notFound(msg) {
    const {ctx} = this;
    msg = msg || 'not found';
    ctx.throw(404, msg);
  }
}
module.exports = BaseController;