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
    const filteredBoards = boards.filter((b) => !b.deleteFlag);
    res.json(filteredBoards);
};

// 특정 게시글 조회
const getBoardById = (req, res) => {
    const boards = getBoards();
    const board = boards.find((b) => b.id === Number(req.params.id) && !b.deleteFlag);
    if (!board) {
        return res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
    }
    board.comment = board.comment.filter((c) => !c.deleteFlag);
    res.json(board);
};

// 게시글 생성
const createBoard = (req, res) => {
    const boards = getBoards();
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
const deleteBoard = (req, res) => {
    try {
        const boards = getBoards();
        const boardIndex = boards.findIndex((b) => b.id === Number(req.params.id));

        if (boardIndex === -1) {
            return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
        }

        // 소프트 딜리트
        boards[boardIndex].deleteFlag = true;

        saveBoards(boards);
        res.status(200).json({ message: '게시글이 삭제되었습니다.', board: boards[boardIndex] });
    } catch (error) {
        console.error('게시글 삭제 중 오류 발생:', error);
        res.status(500).json({ message: '게시글 삭제 중 오류가 발생했습니다.' });
    }
};
// 특정 게시글에 댓글 추가
const addComment = (req, res) => {
    try {
        const boards = getBoards();
        const boardIndex = boards.findIndex((b) => b.id === Number(req.params.id));

        if (boardIndex === -1) {
            return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
        }

        const board = boards[boardIndex];

        // 새로운 댓글 ID 생성 (기존 댓글 중 가장 높은 `cid` 찾고 +1)
        const newCommentId = board.comment.length > 0 
            ? Math.max(...board.comment.map(c => c.cid)) + 1 
            : 1;

        // 새 댓글 객체 생성
        const newComment = {
            cid: newCommentId,
            ccontent: req.body.ccontent, // 댓글 내용
            cwriter: req.body.cwriter,   // 작성자
            cdate: getFormattedDate() // YYYY-MM-DD 형식
        };

        // 댓글 리스트에 추가
        board.comment.push(newComment);
        saveBoards(boards);

        res.status(201).json({ message: '댓글이 추가되었습니다.', comment: newComment });
    } catch (error) {
        console.error('댓글 추가 중 오류 발생:', error);
        res.status(500).json({ message: '댓글 추가 중 오류가 발생했습니다.' });
    }
};
const modifyComment = (req, res) => {
    try {
        const boards = getBoards();
        const boardIndex = boards.findIndex((b) => b.id === Number(req.params.id));

        if (boardIndex === -1) {
            return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
        }

        const board = boards[boardIndex];
        const commentIndex = board.comment.findIndex((c) => c.cid === Number(req.params.cid));

        if (commentIndex === -1) {
            return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
        }

        // 댓글 수정
        board.comment[commentIndex].ccontent = req.body.ccontent;
        board.comment[commentIndex].cdate = new Date().toISOString().split('T')[0]; // 수정 날짜 반영

        saveBoards(boards);
        res.status(200).json({ message: '댓글이 수정되었습니다.', comment: board.comment[commentIndex] });
    } catch (error) {
        console.error('댓글 수정 중 오류 발생:', error);
        res.status(500).json({ message: '댓글 수정 중 오류가 발생했습니다.' });
    }
};
const deleteComment = (req, res) => {
    try {
        const boards = getBoards();
        const boardIndex = boards.findIndex((b) => b.id === Number(req.params.id));

        if (boardIndex === -1) {
            return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
        }

        const board = boards[boardIndex];
        const commentIndex = board.comment.findIndex((c) => c.cid === Number(req.params.cid));

        if (commentIndex === -1) {
            return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
        }

        // 소프트 딜리트
        board.comment[commentIndex].deleteFlag = true;

        saveBoards(boards);
        res.status(200).json({ message: '댓글이 삭제되었습니다.', comment: board.comment[commentIndex] });
    } catch (error) {
        console.error('댓글 삭제 중 오류 발생:', error);
        res.status(500).json({ message: '댓글 삭제 중 오류가 발생했습니다.' });
    }
};
module.exports = { getAllBoards, getBoardById, createBoard, modifyBoardById, deleteBoard, addComment, modifyComment, deleteComment};
