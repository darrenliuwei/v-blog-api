module.exports = (options: any) => {
  return async function (ctx: any, next: any) {
    const token = ctx.app.jwt.decode(ctx.request.header.authorization, options.secret);
    if (token === null) {
      ctx.body = { code: 2, msg: 'token失效' };
    } else {
      await next();
    }
  };
};
