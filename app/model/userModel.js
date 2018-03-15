const uuid = require("uuid");

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

  const user = {
    pid,
    name,
    email:"",
    phone:"",
    website:"",
    regtime:new Date()
  }
  return user
}
module.exports = userModel;