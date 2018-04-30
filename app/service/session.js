'use strict';

const Service = require('egg').Service;

class SessionService extends Service {
  async findUserWithPsw(params) {
    const { username, password } = params;
    const result = await this.app.mysql.get('userlist', params);
    return result
  }
  async registerClient(userPid, clientId) {
    await this.app.mysql.query(`update userlist set online=1, clientId=? where pid=?`, [clientId, userPid]);
    const result = await this.ctx.service.user.findUserById(userPid);
    return result
  }
  async exitClient(userPid) {
    await this.app.mysql.query(`update userlist set online=0, clientId=? where pid=?`, [null, userPid]);
    const result = await this.ctx.service.user.findUserById(userPid);
    return result
  }
}

module.exports = SessionService;
