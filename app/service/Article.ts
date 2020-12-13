import { Service } from 'egg';

// 文章内容
interface IArticle {
  title: string;
  intro: string;
  content: string;
  ip: string;
  status?: number;
  create_time: number;
  update_time: number;
}

export default class Article extends Service {
  /**
   * 查询文章列表，每次10条，pageNumber代表页数
   * @param status - 文章显示与隐藏：0表示显示，1表示隐藏，默认为0
   * @param pageNumber - 页数
   */
  public async index(status: number, pageNumber: number) {
    const { app } = this;
    const res = await app.mysql.select('article', {
      columns: ['id', 'title', 'intro', 'content', 'ip', 'create_time', 'update_time'],
      where: { status },
      orders: [['id', 'desc']],
      limit: 10,
      offset: (pageNumber - 1) * 10,
    });
    const total: number = await app.mysql.count('article', { status });
    return { data: res, total };
  }

  /**
   * 获取指定ID的文章
   * @param id - 文章ID
   */
  public async show(id: number) {
    const { app } = this;
    const res: any[] = await app.mysql.select('article', {
      columns: ['id', 'title', 'content', 'create_time', 'update_time'],
      where: { id },
    });
    // 如果获取到的数组长度为0，那么就说明没有查询到数据
    if (res.length === 0) return 2;
    return res;
  }

  /**
   * 添加文章
   * @param data - 要添加的文章内容
   */
  public async create(data: IArticle) {
    const { app } = this;
    data.create_time = Date.now(); // 文章的创建时间
    data.update_time = Date.now(); // 文章的更新时间
    const res = await app.mysql.insert('article', data);
    return res;
  }

  /**
   * 修改文章
   * @param row - 要修改的文章内容
   */
  public async update(row: IArticle) {
    const { app } = this;
    row.update_time = Date.now(); // 文章的更新时间
    const res = await app.mysql.update('article', row);
    return res;
  }

  /**
   * 硬删除文章
   * @param id - 要删除的文章ID
   */
  public async destroy(id: number) {
    const { app } = this;
    const res = await app.mysql.delete('article', { id });
    return res;
  }

  /**
   * 恢复显示文章
   * @param id - 要恢复的文章ID
   */
  public async recover(id: number) {
    const { app } = this;
    const res = await app.mysql.update('article', { id, status: 0 });
    return res;
  }

  /**
   * 软删除文章
   * @param id - 要软删除的文章ID
   */
  public async softDelete(id: number) {
    const { app } = this;
    const res = await app.mysql.update('article', { id, status: 1 });
    return res;
  }
}
