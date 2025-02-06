const multer = require('multer');
const path = require('path');

// 업로드 파일 저장 경로 및 이름 설정
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // 파일 저장 경로
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // 파일명: 현재시간 + 확장자
    }
});

// 파일 필터링 (이미지 파일만 허용)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('이미지 파일만 업로드할 수 있습니다.'), false);
    }
};

// Multer 설정 적용
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB 제한
});

module.exports = upload;
