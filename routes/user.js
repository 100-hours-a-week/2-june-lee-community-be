const express = require('express');
const router = express.Router();
const { getUsers, updateUser } = require('../controllers/userController');
const upload = require('../config/multerConfig');

router.get('/', getUsers); // 모든 사용자 조회
router.patch('/:userId', upload.single('profileImage'), updateUser); // 사용자 정보 수정

module.exports = router;
