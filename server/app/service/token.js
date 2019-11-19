'use strict';

const Service = require('egg').Service;

class ToolsService extends Service {
    async setToken(userToken) {
        return  this.app.jwt.sign(userToken, this.app.Vue.secret, {expiresIn: '20000s'})
    }
}

module.exports = ToolsService;