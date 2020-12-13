import { Controller } from 'egg';

export default class ClassifyController extends Controller {
  // 添加文章分类
  public async create() {
    const { ctx, service } = this;
    const data: any = ctx.request.body;
    try {
      await service.classify.create(data);
      ctx.body = {
        code: 1,
        msg: '添加文章分类成功',
      };
    } catch {
      ctx.body = {
        code: 2,
        msg: '添加文章分类失败',
      };
    }
  }

  // 更新文章分类信息
  public async update() {
    const { ctx, service } = this;
    const id: number = ctx.params.id;
    const data: any = ctx.request.body;
    try {
      await service.classify.update(id, data);
      ctx.body = {
        code: 1,
        msg: '更新文章分类信息成功',
      };
    } catch {
      ctx.body = {
        code: 2,
        msg: '更新文章分类信息失败',
      };
    }
  }
}
