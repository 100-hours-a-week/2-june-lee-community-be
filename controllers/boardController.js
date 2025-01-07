const { getBoards, saveBoards } = require('../models/boardModel');

// 모든 게시글 조회
const getAllBoards = (req, res) => {
    const boards = getBoards();
    res.json(boards);
};

// 특정 게시글 조회
const getBoardById = (req, res) => {
    const boards = getBoards();
    const board = boards.find((b) => b.id === Number(req.params.id));
    if (!board) {
        return res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
    }
    res.json(board);
};

// 게시글 생성
const createBoard = (req, res) => {
    const boards = getBoards();
    const newBoard = {
        id: boards.length + 1,
        ...req.body,
        date: new Date().toISOString()
    };
    boards.push(newBoard);
    saveBoards(boards);
    res.status(201).json(newBoard);
};

module.exports = { getAllBoards, getBoardById, createBoard };
