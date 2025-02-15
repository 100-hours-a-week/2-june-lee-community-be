const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/boards.json');

const getBoards = () => {
    try{
        const jsonData = fs.readFileSync(dataPath, 'utf8');
        const boards = JSON.parse(jsonData);

        // 🚀 `comment`가 JSON 문자열이면 배열로 변환
        boards.forEach((board) => {
            if (typeof board.comment === 'string') {
                try {
                    board.comment = JSON.parse(board.comment);
                    if (!Array.isArray(board.comment)) {
                        board.comment = []; // 변환 실패 시 빈 배열
                    }
                } catch (error) {
                    console.error(`댓글 변환 오류 :`, error);
                    board.comment = []; // 변환 실패 시 빈 배열
                }
            }
        });

        return boards;
    } catch (error) {
        console.error('게시글 로드 중 에러:', error);
        return []; // 파일 읽기 실패 시 빈 배열 반환
    }
};

const saveBoards = (boards) => {
    try {
        // 기존 데이터 백업
        if (fs.existsSync(dataPath)) {
            const backupPath = `${dataPath}.backup`;
            fs.copyFileSync(dataPath, backupPath);
        }

        // 데이터 저장
        fs.writeFileSync(dataPath, JSON.stringify(boards, null, 2), 'utf8');
    } catch (error) {
        console.error('게시글 저장 중 에러:', error);
        throw new Error('게시글 저장에 실패했습니다.');
    }
};


// const getBoards = () => JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// const saveBoards = (boards) => fs.writeFileSync(dataPath, JSON.stringify(boards, null, 2), 'utf8');

module.exports = { getBoards, saveBoards };
