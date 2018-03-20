/*
 * @Author: guo.mk 
 * @Date: 2018-03-14 17:57:31 
 * @Last Modified by: guo.mk
 * @Last Modified time: 2018-03-14 18:42:27
 */
"use strict";
const Controller = require("../core/base_controller");
const UserModel = require('../model/userModel');

class UserController extends Controller {
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
  /**
 * 查询所有用户
 */
  async index() {
    const ctx = this.ctx;
    const users = await ctx.service.user.findAll();

    ctx.status = 200;
    ctx.body = {
      status: ctx.status,
      users
    }
  }
  /**
 * 注册新用户
 */
  async create() {
    const { ctx, service } = this;
    const param = ctx.request.body;
    let result = {};
    let defaultResult = {
      msg: "注册成功",
      status: 200
    }
    ctx.validate(this.UserRule);

    const findUser = await service.user.findUser(param.username);
    if (findUser) {
      ctx.status = 404;
      ctx.body = {
        status: 404,
        msg: '注册失败,该用户已存在'
      }
      return;
    }
    // 设置用户模型
    const userModel = UserModel()
    const userInfo = Object.assign(userModel, param);
    const res = await service.user.createUser(userInfo);
    result = Object.assign(defaultResult, res)
    ctx.body = result
  }
  /**
  * 删除用户
  */
  async destroy() {
    const { ctx, service } = this;
    ctx.validate(this.UseIdrRule, ctx.params)
    const { params: { id = 0 } } = ctx;
    const res = await service.user.deleteUserId(id);
    this.success({ res })
  }
  /**
  * 根据id查找用户
  */
  async show() {
    const { ctx, service } = this;
    ctx.validate(this.UseIdrRule, ctx.params)
    const { params: { id = 0 } } = ctx;
    const res = await service.user.findUserById(id);
    this.success({ res })
  }
  /**
   * 根据id修改用户的信息
   */
  async update() {
    const { ctx, service } = this;

    ctx.validate(this.UseIdrRule, ctx.params)

    const param = ctx.request.body;
    const { params: { id = 0 } } = ctx;

    const updateResult = await service.user.updateUserById(id, param);
  }
  async edit() { }
}

module.exports = UserController;
