const Service = require('egg').Service;
class UserService extends Service {
  async find() {
    const users = await this.app.mysql.select('userlist');
    return users
  }
  async add(userInfo){
    const result  = await this.app.mysql.insert('userlist',userInfo);
    return result
  }
}
module.exports = UserService;
