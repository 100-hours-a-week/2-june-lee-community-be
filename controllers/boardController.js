const { getBoards, saveBoards } = require('../models/boardModel');

function getFormattedDate() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // 0부터 시작하므로 +1 필요
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
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
    // const newBoard = {
    //     id: boards.length + 1,
    //     ...req.body,
    //     date: new Date().toISOString(),
    //     image: req.file ?`/uploads/${req.file.filename}` : `/public/cat.jpg` 
    // };
    const newBoard = {
        id: boards.length + 1,
        title: req.body.title,
        content: req.body.content,
        writer: req.body.writer,
        likes: 0,
        views: 0,
        comment: [],
        date: getFormattedDate(),
        image: req.file ? `/uploads/${req.file.filename}` : null // 업로드된 이미지 URL 저장
    };
    boards.push(newBoard);
    saveBoards(boards);
    res.status(201).json(newBoard);
};

// 게시글 수정
const modifyBoardById = (req, res) => {
    try{
        const boards = getBoards();
        const boardIndex = boards.findIndex((b) => b.id === Number(req.params.id));
        if (boardIndex === -1) {
            return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' }); // 게시글이 없는 경우
        }
        
        const parseComments = (commentString) => {
            try {
                const parsed = JSON.parse(commentString);
                return Array.isArray(parsed) ? parsed : [];
            } catch (error) {
                return [];
            }
        };
        // PATCH 요청에서 `comment` 변환
        let updatedComments = parseComments(req.body.comment);
        
        boards[boardIndex]={
            ...boards[boardIndex], // 기존 게시글 데이터 유지
            id: parseInt(req.body.id),
            title: req.body.title,
            content: req.body.content,
            writer: req.body.writer,
            likes: parseInt(req.body.likes),
            views: parseInt(req.body.views),
            comment: updatedComments,
            date: req.body.date,
            image: req.file ? `/uploads/${req.file.filename}` : boards[boardIndex].image
        };
        saveBoards(boards);
        res.status(200).json(boards[boardIndex]);
    }
    catch (error) {
        console.error('게시글 수정 중 에러:', error);
        res.status(500).json({ message: '게시글 수정 중 에러가 발생했습니다.' });
    }
};

module.exports = { getAllBoards, getBoardById, createBoard, modifyBoardById };
