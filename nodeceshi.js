/**
 * Created by zj on 2018/1/19.
 */
var fs = require('fs');
var url = require('url');
var http = require('http');
var path = require('path');
var server = http.createServer(function(req,res) {
    var pathName = url.parse(req.url).pathname;
    //console.log('pathName',pathName)
    if(pathName == '/'){
        pathName = 'index.html';
    }
    var extName = path.extname(pathName);
    var file = fs.readFile('./ceshi/'+pathName,function(err,data){
        if(err) {
            fs.readFile('../ceshi/404.html',function(err,data) {
                res.writeHead(404,{"Content-type":"text/html;charset=UTF-8"});
                res.end(data);
            })
            return;
        }
        // console.log('extName',extName)
        var mine = getMime(extName);
        // console.log('mine',mine)
        res.writeHead(200,{"Content-type":mine});
        res.end(data);
    })
})
server.listen(8080);
console.log('服务器开启成功')
function getMime(extname){
    switch(extname){
        case ".html" :
            return "text/html";
            break;
        case ".jpg" :
            return "image/jpg";
            break;
        case ".css":
            return "text/css";
            break;
        // case "json":
        //     return 'application/json';
        //     break;
        case ".js":
            return 'application/javascript';
            break;
        default:
            return 'application/json';
    }
}