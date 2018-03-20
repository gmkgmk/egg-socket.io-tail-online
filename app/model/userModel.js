const uuid = require("uuid");
const crypto = require('crypto');
const Identicon = require('identicon.js');
// const userModel = () => {
//   const key = uuid.v4();
//   const name = "正在睡觉";
//   const avatar = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";

//   const user = {
//     key,
//     name,
//     avatar,
//     time: new Date(),
//     friendList: ""
//   }

//   return user
// }
const userModel = () => {
  const pid = uuid.v4();
  const name = Math.random().toString(36).substr(2);
  const hash = crypto.createHash('md5');
  console.log(hash)
  hash.update(name);
  let avatar = 'data:image/png;base64,' + new Identicon(hash.digest('hex')).toString(); // 这就是头像的base64码
  const numberId = (Math.random() * 100000).toFixed(0);
  // "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
  const user = {
    avatar,
    pid,
    name,
    numberId,
    email: "",
    phone: "",
    website: "",
    regtime: new Date()
  }
  return user
}
module.exports = userModel;