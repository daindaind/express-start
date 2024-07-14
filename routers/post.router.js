const router = require('express').Router();
const connection = require('../config');
const mysql = require('../config');

// 화살표 함수 = 익명 함수
// 변수에 함수를 담을 수 있다.

// query로 게시글 찾기
router.get('/', (req, res) => {
   // request, response
   // request 객체, response 객체
   // request 객체 = client가 요청에 담아서 보낸 모든 정보
   // response 객체 = 서버가 보낼 정보를 담은 객체
   // res.send();
   // res.json();
   // res.sendFile();

   const sql = `SELECT * FROM Express.Post`;
   const titleQuery = req.query.title;
   const contentQuery = req.query.content;

   connection.query(sql, (error, result) => {
      if (error) {
         console.error(error);
         res.send('error');
         return;
      }

      const results = result.filter((post) => 
         (post.title === titleQuery && post.content === contentQuery)
      );

      if (results.length > 0) {
         res.send(results);
      } else {
         res.send('Post Not Found On Query');
      }
   })
});


// params으로 게시글 찾기
router.get('/:title/:content', (req, res) => {
   const titleParam = req.params.title;
   const contentParam = req.params.content;
   const sql = `SELECT * FROM Express.Post`;

   connection.query(sql, (error, result) => {
      console.log(result);
      if (error) {
         console.error(error);
         res.send('error');
         return;
      }

      const results = result.filter((post) => 
         (post.title === titleParam && post.content === contentParam)
      );

      if (results.length > 0) {
         res.send(results);
      } else {
         res.send('Post Not Found On params');
      }
   })
});

router.get('/:id', (req, res) => {
   const id = req.params.id;
   const sql = `SELECT * FROM Express.Post WHERE id = ${id}`;

   connection.query(sql, (error, result) => {
      if (error) {
         console.error(error);
         res.send('error');
         return;
      }

      if (result.length > 0) {
         res.send(result[0]);
      } else {
         res.send('Post Not Found On params')
      }
   })
})

// 게시글 생성하기
router.post('/', (req, res) => {
   const body = req.body;


   const { title, content } = body;

   const sql = `INSERT INTO Post (title, content) VALUES ('${title}', '${content}')`;
   mysql.query(sql);

   res.send('Post Success');
})

module.exports = router;