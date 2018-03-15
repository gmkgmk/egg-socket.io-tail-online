'use strict';

const Service = require('egg').Service;

class SessionService extends Service {
  async findUserWithPsw(params) {
    const { username, password } = params;
    const result = await this.app.mysql.get('userlist', params);
    console.log("result",result)
    return result
  }
}

module.exports = SessionService;