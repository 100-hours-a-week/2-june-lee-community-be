const express = require('express');
const router = express.Router();
const { getAllBoards, getBoardById, createBoard, modifyBoardById } = require('../controllers/boardController');
const upload = require('../config/multerConfig');

router.get('/', getAllBoards); // 모든 게시글 조회
router.get('/:id', getBoardById); // 특정 게시글 조회
router.post('/', upload.single('image'),createBoard); // 게시글 생성
router.patch('/:id', upload.single('image'), modifyBoardById);// 특정 게시글 수정
// router.post('/users/login', (req, res) => {
//     const {email, password} = req.query;
//     let invalid = false;
    
//     if(email && password){
//         return res.status(200).json({
//             status: 200,
//             message: 'login_success',
//             data: {
//                 userId: 1,
//                 email,
//                 nickname: "테스트777",
//                 created_at: "2025-01-21T09:59:50.000Z",
//                 updated_at: "2025-01-21T09:59:50.000Z",
//                 deleted_at: null,
//                 auth_token: "pGGXsa6vaKs615CYO0GpJjcDpN6WUjQa"
//             }
//         });
//     }
//     else if(!email){
//         return res.status(400).json({
//             status: 400,
//             message: 'required_email',
//             data: null
//         });
//     }
//     else if(!password){
//         return res.status(400).json({
//             status: 400,
//             message: 'required_password',
//             data: null
//         });
//     }
//     else if(invalid){
//         return res.status(401).json({
//             status: 401,
//             message: 'invalid_email_or_password',
//             data: null
//         });
//     }
//     else{
//         return res.status(500).json({
//             status: 500,
//             message: 'internal_server_error',
//             data: null
//         });
//     }
// });//로그인


// router.post('/users/signup', (req, res) => {
//     if(email && password && nickname){
//         return res.status(201).json({
//             status: 201,
//             message: 'register_success',
//             data: {
//                 userId: 1,
//                 profile_image_id: 1,
//             }
//         });
//     }
//     if(!email){
//         return res.status(400).json({
//             status: 400,
//             message: 'invalid_email',
//             data: null
//         });
//     }
//     // if(!email){
//         return res.status(500).json({
//             status: 500,
//             message: 'internal_server_error',
//             data: null
//         });
//     // }
// });//회원가입

// router.get('/users/:user_id', (req, res) => {
//     if(userId){
//         return res.status(200).json({
//             status : 200,
//             message : null,
//             data : {
//                 userId: 1,
//                 email: "test@test.kr",
//                 nickname: "테스트777",
//                 profile_image: "/public/image/profile/test.jpg",
//                 created_at: "2024-03-26T09:59:50.000Z",
//                 updated_at: "2024-03-26T09:59:50.000Z",
//                 deleted_at: null
//             }
            
//         });
//     }
// });//유저 정보 조회

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
