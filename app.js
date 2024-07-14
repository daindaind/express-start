const express = require('express');
const app = express();  // 서버 생성, 생성된 서버를 app이라는 변수에 담는다.
const port = 3000;
const userRouter = require('./routers/user.router');
const postRouter = require('./routers/post.router');

// 데이터베이스와 연결
const connection = require('./config');
connection.connect();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// 서버에서 / 라는 경로로 get 요청을 받으면, 콜백 함수를 실행시키겠다.
// 라고 설정한 것.
// 콜백 함수 : 함수 안에 인자로 함수를 넣어서 나중에 호출되도록 만든 함수
app.get('/', (req, res) => {
  res.send('Hello World!');
})

// /user라는 경로로 요청이 들어오면 userRouter를 사용하겠다.
app.use('/user', userRouter);
app.use('/post', postRouter);


// listen : 서버를 열겠다. (3000번 포트로)
// 서버가 열리면 console에 메시지를 출력
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

// route : 길
// router : 길을 연결해주는 녀석 = 길 자체

