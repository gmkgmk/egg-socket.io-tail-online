'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  open() {
    const { ctx, app } = this;
    const message = ctx.args[0];
   


    
  }
}

module.exports = HomeController;
