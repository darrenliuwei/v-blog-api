import { Controller } from 'egg';

export default class ArticleController extends Controller {
  // 显示所有未删除的文章，每次10条，pageNumber代表页数
  public async index() {
    const { ctx, service } = this;
    const status: number = ctx.query.status; // status 代表是否显示文章，0表示显示，1表示隐藏
    const pageNumber: number = ctx.query.pageNumber; // pageNumber 代表分页数
    const res: any = await service.article.index(status, pageNumber);
    ctx.body = res;
  }

  // 获取指定ID的文章
  public async show() {
    const { ctx, service } = this;
    const id: number = ctx.params.id;
    const res = await service.article.show(id);
    if (res === 2) {
      ctx.body = {
        code: 2,
        msg: '获取文章详情失败',
      };
    } else {
      ctx.body = {
        code: 1,
        msg: '获取文章详情成功',
        data: res,
      };
    }
  }

  // 添加文章
  public async create() {
    const { ctx, service } = this;
    const data: any = ctx.request.body;
    data.ip = ctx.ip;
    try {
      await service.article.create(data);
      ctx.body = {
        code: 1,
        msg: '添加文章成功',
      };
    } catch {
      ctx.body = {
        code: 2,
        msg: '添加文章失败',
      };
    }
  }

  // 修改文章
  public async update() {
    const { ctx, service } = this;
    const row: any = ctx.request.body;
    row.ip = ctx.ip;
    try {
      await service.article.update(row);
      ctx.body = {
        code: 1,
        msg: '修改文章成功',
      };
    } catch {
      ctx.body = {
        code: 2,
        msg: '修改文章失败',
      };
    }
  }

  // 硬删除文章
  public async destroy() {
    const { ctx, service } = this;
    const id: number = ctx.params.id;
    try {
      await service.article.destroy(id);
      ctx.body = {
        code: 1,
        msg: '文章硬删除成功',
      };
    } catch {
      ctx.body = {
        code: 2,
        msg: '文章硬删除失败',
      };
    }
  }

  // 恢复显示文章
  public async recover() {
    const { ctx, service } = this;
    const id: number = ctx.request.body.id;
    try {
      await service.article.recover(id);
      ctx.body = {
        code: 1,
        msg: '文章恢复成功',
      };
    } catch {
      ctx.body = {
        code: 2,
        msg: '文章恢复失败',
      };
    }
  }

  // 软删除文章
  public async softDelete() {
    const { ctx, service } = this;
    const id: number = ctx.request.body.id;
    try {
      await service.article.softDelete(id);
      ctx.body = {
        code: 1,
        msg: '文章移入回收站成功',
      };
    } catch {
      ctx.body = {
        code: 2,
        msg: '文章移入回收站失败',
      };
    }
  }
}
