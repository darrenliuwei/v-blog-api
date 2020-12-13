import { Controller } from 'egg';
var md5 = require('md5');

export default class AdminController extends Controller {
  // 管理员登录
  public async login() {
    const { ctx, service, app, config } = this;
    const userInfo = ctx.request.body;
    // 对密码进行md5加密
    userInfo.passwd = md5(userInfo.passwd);
    // 登录
    const res = await service.admin.login(userInfo);
    // 创建token
    const token = app.jwt.sign({ login: 'ok' }, config.jwt.secret);
    if (res[0]) {
      ctx.body = {
        code: 1,
        msg: '管理员登录成功',
        token,
      };
    } else {
      ctx.body = {
        code: 2,
        msg: '管理员登录失败',
      };
    }
  }
}
