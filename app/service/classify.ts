import { Service } from 'egg';

// 文章内容
interface IClassify {
  id?: number;
  name: string;
  status?: number;
  create_time: number;
  update_time: number;
}

/**
 * 文章分类管理
 */
export default class Classify extends Service {
  /**
   * 添加文章分类
   * @param data - 要添加的分类内容
   */
  public async create(data: IClassify) {
    const { app } = this;
    data.create_time = Date.now(); // 分类的创建时间
    data.update_time = Date.now(); // 分类的更新时间
    const res = await app.mysql.insert('classify', data);
    return res;
  }

  /**
   * 更新文章分类
   * @param data - 要更新的分类内容
   */
  public async update(id: number, data: IClassify) {
    const { app } = this;
    data.id = id;
    data.update_time = Date.now(); // 分类的更新时间
    const res = await app.mysql.update('classify', data);
    return res;
  }
}
