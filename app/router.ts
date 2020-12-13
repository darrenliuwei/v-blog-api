import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);

  // 管理员登录
  router.post('/login', controller.admin.login);

  // 文章分类管理
  router.resources('classify', '/classify', controller.classify);

  // 文章路由
  router.resources('article', '/article', controller.article);
  // 恢复显示文章
  router.post('/article/recover', controller.article.recover);
  // 软删除文章
  router.post('/article/soft-delete', controller.article.softDelete);
};
