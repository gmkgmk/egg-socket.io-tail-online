/*
 * @Author: guo.mk 
 * @Date: 2018-03-09 10:36:57 
 * @Last Modified by: guo.mk
 * @Last Modified time: 2018-03-14 19:17:43
 */
const Service = require('egg').Service;

class UserService extends Service {
  /**
   * 查找所有用户信息
   * @returns {object} result 
   * @memberof UserService
   */
  async findAll() {
    const result = await this.app.mysql.select('userlist');
    return result;
  }
  /**
   * 创建用户
   * @param {object} user 
   * @returns 
   * @memberof UserService
   */
  async createUser(user) {
    const result = await this.app.mysql.insert('userlist', user);
    return result
  }
  /**
   * 查询所有用户
   * @param {any} username 
   * @returns 
   * @memberof UserService
   */
  async findUser(username) {
    if (!username) {
      return null;
    }
    const result = await this.app.mysql.get('userlist', { username });
    return result
  }
  /**
   * 根据pid删除用户
   * 
   * @param {any} pid 
   * @returns 
   * @memberof UserService
   */
  async deleteUserId(pid) {
    if (!pid) return null;

    const result = await this.app.mysql.delete('userlist', { pid });
    return result
  }
  async findUserById(id) {
    if (!id) return;
    const result = await this.app.mysql.get('userlist', { pid: id });
    return result
  }
  async updateUserById(id, param) {
    const result = await this.app.mysql.query(`update userlist set phone=? where pid=?`, ["123", id]);
    return result
  }
}
module.exports = UserService;
