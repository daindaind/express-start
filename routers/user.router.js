// app : 메인 서버
// router : 메인 서버에 연결할 수 있는 길

const router = require('express').Router();
const mysql = require('../config');
// const postRouter = require('./post.router');


// router.get('/', (req, res) => {
//    res.send('User Router GET /user');
// })

// 이렇게 router를 연결 연결해서 쓸 수 있다.
// router.use('/post', postRouter);

// query 이용헤보기
router.get('/', (req, res) => {
   const query = req.query;

   const user = {
      user: 'dain',
      age: 20,
      nickname: 'test'
   }

   const nickname = query.nickname;
   console.log(`nickname: ${nickname}`);

   if (user.nickname === nickname) {
      res.json(user);
   } else {
      res.send('User Not Found');
   }
});

// param 이용해보기
router.get('/:name', (req, res) => {
   const param = req.params;

   const user = {
      user: 'dain',
      age: 20,
      nickname: 'test'
   }

   const name = param.name;
   console.log(name);

   if (user.name === name) {
      res.json(user);
   } else {
      res.send('User Not Found On Params');
   }
});

// post, put, patch
router.post('/', (req, res) => {
   const body = req.body;

   console.log(body)

   res.json(body);
});

router.post('/sign-up', (req, res) => {
   const body = req.body;

   // body.email, body.password, body.nickname
   const { email, password, nickname } = body;

   const sql = `INSERT INTO User (email, password, nickname) VALUES ('${email}', '${password}','${nickname}' )`;
   mysql.query(sql);  // mysql에 작성한 쿼리문을 날림

   res.send('Sign up Success');
})

// 다른 파일에서 쓸 수 있도록 export
module.exports = router;