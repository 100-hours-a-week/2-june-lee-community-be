const express = require('express');
const router = express.Router();
const {requireAuth, getUsersInform, getUserInformByWriterId, loginUser, signUpUser, logoutUser, updateUser, deleteUser} = require('../controllers/userController');
const upload = require('../config/multerConfig');

router.get('/auth/check', requireAuth); // 보호된 라우트
router.get('/', getUsersInform); //유저정보조회
router.get('/:writerId', getUserInformByWriterId);
// router.get('/email/check?email=test@test.kr', emailCheck); //이메일 중복 체크
// router.get('/nickname/check?nickname=test', nicknameCheck); //닉네임 중복 체크

router.post('/login', loginUser); // 사용자 조회 및 세션등록
router.post('/signup', upload.single('profileImage'), signUpUser);  
router.post('/logout', logoutUser);

router.patch('/', upload.single('profileImage'), updateUser); // 사용자 정보 수정
router.patch('/password', updateUser); // 사용자 비밀번호 수정

router.delete('/', deleteUser);

module.exports = router;
