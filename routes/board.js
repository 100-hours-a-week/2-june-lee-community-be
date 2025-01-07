const express = require('express');
const router = express.Router();
const { getAllBoards, getBoardById, createBoard } = require('../controllers/boardController');

router.get('/', getAllBoards); // 모든 게시글 조회
router.get('/:id', getBoardById); // 특정 게시글 조회
router.post('/', createBoard); // 게시글 생성

module.exports = router;
