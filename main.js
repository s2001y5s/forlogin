var http = require('http');
var url = require('url');
var qs = require('querystring');
var cookie = require('cookie');
var mysql = require('mysql');
var db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'dus123',
  database:'study'
});
db.connect();

function isHeLogined(request, response) {
  var cookies = {};
  if(request.headers.cookie) {
    return '<a href="/logout_process">logout</a>';
  }
  else {
    return '<a href="/login">login</a>';
  }
}

var app = http.createServer(function(request,response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    var resultdata =isHeLogined(request, response);
    if(pathname === '/') {
      if(queryData.id === undefined) {
        db.query(`SELECT * FROM topic`, function(error, topics) {
          response.writeHead(200);
          response.end(`
          <!doctype html>
          <html>
          <head>
            <title>LOGIN</title>
            <meta charset="utf-8">
          </head>
          <body>
            ${resultdata}
          </body>
          </html>
          `);
        });
      }

      else {
        response.writeHead(200);
        response.end(1);
      }
    }

    else if(pathname === '/login') {
      db.query(`SELECT * FROM topic`, function(error, topics) {
        response.writeHead(200);
        response.end(`
        <!doctype html>
        <html>
        <head>
          <title>LOGIN</title>
          <meta charset="utf-8">
        </head>
        <body>
          <form action="/login_process" method="post">
          <input type = "text" name ="id" placeholder="id" ><p></p>
          <input type = "text" name ="password" placeholder="password" >
          <p></p><input type = "submit" value="login">
          <a href="/register">register</a>
          </form>
        </body>
        </html>
        `);
      });
    }

    else if(pathname === '/login_process') {
      var body = '';
      request.on('data', function(data) {
        body += data;
      });

      request.on('end', function() {
        var post = qs.parse(body);
        db.query(`SELECT * FROM login`, function(error, login) {
          for(var i = 0; i < login.length ; i++) {
            if(post.id === login[i].id && post.password === login[i].password) {
              response.writeHead(302, 
              {
                'Set-Cookie': [
                  `id=${post.id}`,
                  `password=${post.password}`
                ],
              Location:`/`
            });
            response.end();
            }
          }
          response.writeHead(302, {Location:`/login`});
          response.end();
        });
      });
    }

    else if(pathname === '/logout_process') {
      var body = '';
      request.on('data', function(data) {
        body += data;
      });

      request.on('end', function() {
      var post = qs.parse(body);
        response.writeHead(302, 
        {
          'Set-Cookie': [
            `id=; Max-Age=0`,
            `password=; Max-Age=0`
          ],
        Location:`/`
        });
        response.end();
      });
    }

    else if(pathname === '/register') {
      response.writeHead(200);
      response.end(`
      <!doctype html>
      <html>
      <head>
        <title>LOGIN</title>
        <meta charset="utf-8">
      </head>
      <body>
        <form action="/register_process" method="post">
        <input type = "text" name ="id" placeholder="ID  to register" ><p></p>
        <input type = "text" name ="password" placeholder="password" >
        <p></p><input type = "submit">
        <a href="/register">register</a>
      </body>
      </html>
      `);
    }

    else if(pathname === '/register_process') {
      var body = '';
      request.on('data', function(data) {
        body += data;
      });

      request.on('end', function() {
        var post = qs.parse(body);
        db.query(`SELECT * FROM login`, function(error, login) {
          for(var i = 0; i < login.length ; i++) {
            if(post.id === login[i].id) {
              response.writeHead(302, {Location:`/register`});
              response.end();
            }
          }
          db.query(`INSERT INTO login (id, password, created) 
          VALUES(?, ?, NOW())`, [post.id, post.password], function(error1,reuslt) {
            if(error1) { throw error1;}
            response.writeHead(302, {Location:`/`});
            response.end();
          });
        });
      });
    }

    else {
      response.writeHead(404);
      response.end('Not Found');
    }
});

app.listen(3000);
