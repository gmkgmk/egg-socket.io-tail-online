'use strict';

const Service = require('egg').Service;

class FriendsService extends Service {
  async findAllFriend(friendsArr) {
    let sql = friendsArr.map(item=>{
     return `SELECT * FROM userlist WHERE numberId=${item} `
    })
    sql = sql.join("UNION ")
    const result = await this.app.mysql.query(sql);
    return result
  }
  
}

module.exports = FriendsService;
