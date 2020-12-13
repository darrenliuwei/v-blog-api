import 'egg';

interface Imysql {
  insert: Function;
  get: Function;
  select: Function;
  update: Function;
  count: Function;
  delete: Function;
}

declare module 'egg' {
  interface Application {
    mysql: Imysql;
  }
}
