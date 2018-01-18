/**
 * Created by zj on 2018/1/17.
 */
const Koa = require('koa');
const app = new Koa();
var http = require('http');
var fs = require('fs');//引入文件读取模块
var urlLib = require('url');
const router = require('koa-router')();//路由分配
var cors = require('koa-cors');//解决跨域的需求
var documentRoot = 'D:/githubprivate/nodeStudy';
var config = require('./config/default.js');
// session存储配置
const sessionMysqlConfig= {
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    host: config.database.HOST,
}
router.get('/',function(ctx,next) {
    ctx.body = '主路由';
})
router.get('/hello/:username',function(ctx,next) {
    console.log(ctx.params)
    ctx.body = JSON.stringify({id:100});;
    // ctx.body = '主路由hello';
})
app.use(cors());
app.use(router.routes())
var server= http.createServer(function(req,res){
    var url = req.url;
    //客户端输入的url，例如如果输入localhost:8888/index.html
    //那么这里的url == /index.html
    // res.setHeader('Access-Control-Allow-Origin', '*');
    var file = documentRoot + url;
    // var file = url;
    console.log(url);
    //E:/PhpProject/html5/websocket/www/index.html


    fs.readFile( file , function(err,data){
        /*
         一参为文件路径
         二参为回调函数
         回调函数的一参为读取错误返回的信息，返回空就没有错误
         二参为读取成功返回的文本内容
         */
        var parms = urlLib.parse(req.url,true);
        // var urlop = new URL(url);
        if(parms.pathname == '/ajtest'){
            console.log('data ',data)
            res.writeHead(200, {
                'Content-type': 'application/json; charset=UTF-8'
            });
            res.write(JSON.stringify({
                test: 'success'
            }));
            //var str = parms.query.callback + '(' + JSON.stringify(data) +')';
            //res.end(str);
            res.end();
        }else if(err){
            res.writeHeader(404,{
                'content-type' : 'text/html;charset="utf-8"'
            });
            res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
            res.end();
        }else{
            res.writeHeader(200,{
                'content-type' : 'text/html;charset="utf-8"'
            });
            res.write(data);//将index.html显示在客户端
            res.end();

        }

    });
}).listen(8080)

app.use(staticCache(path.join(__dirname, './public'), { dynamic: true }, {
    maxAge: 365 * 24 * 60 * 60
}))
app.use(staticCache(path.join(__dirname, './images'), { dynamic: true }, {
    maxAge: 365 * 24 * 60 * 60
}))

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}))
app.use(bodyParser({
    formLimit: '1mb'
}))

//  路由(我们先注释三个，等后面添加好了再取消注释，因为我们还没有定义路由，稍后会先实现注册)
//app.use(require('./routers/signin.js').routes())
app.use(require('./routers/signup.js').routes())
app.listen(3000);
console.log('koa2 is started at port 3000!');
console.log(`listening on port ${config.port}`)