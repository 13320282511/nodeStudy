/**
 * Created by zj on 2018/1/17.
 */
const Koa = require('koa');
const app = new Koa();

app.use( ctx => {
    ctx.body = 'hello world!';
})

app.listen(3000);
console.log('koa2 is started at port 3000!');