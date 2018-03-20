'use strict';
const API = '/api/v1';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  router.get('/user', controller.home.user);
  router.get('/index', controller.home.index);
  router.get('/add', controller.home.addUser);
  // app.router.resources('users', '/api/v2/users', app.controller.user);

  // router.post(`${API}/user/addUser`, controller.user.addUser);
  // router.post(`${API}/user/register`, controller.user.register);
  // router.delete(`${API}/user/deleteUser`, controller.user.deleteUser);
  app.router.resources('users', `${API}/user`, app.controller.user);
  app.router.resources('session', `${API}/session`, app.controller.session);
  app.router.resources('friends', `${API}/friends`, app.controller.friends);

  app.io.route('connection', io.controller.home.index);
  app.io.route('message', io.controller.home.message);
  app.io.route('privateChat', io.controller.home.privateChat);
};
