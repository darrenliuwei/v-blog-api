import { Service } from 'egg';

export default class Admin extends Service {
  /**
   * @param userInfo - 用户信息
   */
  public async login(userInfo: object) {
    const { app } = this;
    const res = await app.mysql.select('admin', {
      where: userInfo,
      columns: ['id'],
    });
    return res;
  }
}
