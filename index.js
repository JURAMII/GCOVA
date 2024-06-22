const express = require('express') //express 연결
const app = express();
const ejs = require('ejs'); //ejs 연결
var cookieParser = require('cookie-parser') //cookie-parser연결


const hostName = '127.0.0.1';
const port = process.env.PORT || 3012; //할당받는 포트로 설정
const path = require('path');



app.set('view engine', 'ejs'); //views 엔진설정
app.set('views','./views'); //views 폴더설정

app.use(cookieParser())
app.use(express.json());
app.use(express.static(path.join(__dirname,'public'))) //public 정적인 애들-변경안하는 애들
// app.use(express.static(__dirname + '/public')); //상대경로
app.use(express.urlencoded({extended:false})); //한글 인코딩
app.use('/',require('./router/router'));


app.listen(port, hostName, () => {
    console.log(`Server running at http://${hostName}:${port}/`);
  });