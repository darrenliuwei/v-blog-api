import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1593870678401_3221';

  // add your egg config in here
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // 配置MySQL数据库信息
  config.mysql = {
    // 单数据库信息配置
    client: {
      // 数据库服务器地址
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '123456',
      // 数据库名
      database: 'blog',
      // debug: true, //打印sql
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  // 关闭CSRF
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // 配置cors
  config.cors = {
    origin: '*',
    allowMethods: 'HEAD, GET, PUT, POST, DELETE, PATCH',
  };

  // 配置jwt
  exports.jwt = {
    secret: 'liuwei-blog', // liuwei-blog是自己随便写的，根据自己项目进行修改
  };

  // 配置Token
  config.token = {
    secret: 'liuwei-blog',
    ignore: [
      '/login',
      (ctx: any) => {
        if (ctx.method === 'GET') {
          return '/article';
        }
      },
    ],
  };

  // 配置中间件
  config.middleware = ['token'];

  // 允许代理
  config.proxy = true;

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
