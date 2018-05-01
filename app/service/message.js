const Service = require('egg').Service;
class MessageService extends Service {
  async findMessage(params) {
    const { pid, message } = params;
    const result = await this.app.mysql.get('message', { pid });
    return result
  }
  /**
   * 
   * @param {*} params 
   * payloadMessage:发送的信息内容
   * pid 接收者pid
   * userPid 发送者pid
   */
  async insertMessage(params) {
    const { payloadMessage: message, pid, userPid } = params;
    const row = {
      pid,
      userPid,
      message
    }
    const result = await this.app.mysql.insert('message', row);
    return result
  }
}


module.exports = MessageService;