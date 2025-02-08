const express = require('express');
const router = express.Router();
const { getAllBoards, getBoardById, createBoard, modifyBoardById, deleteBoard, addComment, modifyComment, deleteComment} = require('../controllers/boardController');
const upload = require('../config/multerConfig');

router.get('/', getAllBoards); // 모든 게시글 조회
router.get('/:id', getBoardById); // 특정 게시글 조회

router.post('/', upload.single('image'),createBoard); // 게시글 생성
router.patch('/:id', upload.single('image'), modifyBoardById);// 특정 게시글 수정
router.delete('/:id', deleteBoard); // 게시글 삭제

router.post('/:id/comments', addComment); // 댓글 추가
router.patch('/:id/comments/:cid', modifyComment); // 댓글 수정
router.delete('/:id/comments/:cid', deleteComment); // 댓글 수정


// router.patch('/users/:user_id', (req,res) => {
//     ;
// });//회원정보수정
// router.patch('/users/:user_id}/password', (req, res) => {
//     res.sendFile(path.join(__dirname,`loginpage.html`));
// });//비밀번호변경
// router.delete('/users/:user_id', (req, res) => {
//     res.sendFile(path.join(__dirname,`loginpage.html`));
// });//회원 정보 삭제

// router.get('/users/auth/check', (req, res) => {
//     res.sendFile(path.join(__dirname,`loginpage.html`));
// });//로그인 상태확인

// router.get('/users/email/check?email=test@test.kr', (req, res) => {
//     res.sendFile(path.join(__dirname,`loginpage.html`));
// });//이메일중복체크
// router.get('/users/nickname/check?nickname=test', (req, res) => {
//     res.sendFile(path.join(__dirname,`loginpage.html`));
// });//닉네임중복체크

// router.get('/posts?offset=0&limit=0', (req, res) => {
//     res.sendFile(path.join(__dirname,`loginpage.html`));
// });//게시글 목록 조회
// router.get('/posts/:post_id', (req, res) => {
//     res.sendFile(path.join(__dirname,`loginpage.html`));
// });//게시글 상세 조회

// router.post('/posts', (req, res) => {
//     res.sendFile(path.join(__dirname,`loginpage.html`));
// });//게시글 추가
// router.patch('/posts/:post_id', (req, res) => {
//     res.sendFile(path.join(__dirname,`loginpage.html`));
// });//게시글 수정
// router.delete('/posts/:post_id', (req, res) => {
//     res.sendFile(path.join(__dirname,`loginpage.html`));
// });//게시글 삭제
module.exports = router;
