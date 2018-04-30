'use strict';
module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1513912050756_3670';
  config.security = {
    domainWhiteList: ['http://localhost:8000','http://localhost:1234','http://www.gmkgmk.com','http://198.13.35.167:443'],
    csrf: {
      enable: false,
    },
    methodnoallow: {
      enable: false
    }
  };
  config.cors = {
    credentials: true,
    allowMethods: 'GET,HEAD,POST,DELETE,PATCH,OPTIONS'
  }

  // add your config here
  config.middleware = [
  ];


  return config;
};
