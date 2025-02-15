const express = require('express');
const app = express();
app.use(express.urlencoded({extended : true}));
const path=require('path');
app.use(express.static(path.join(__dirname)));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000', // 클라이언트 도메인
    credentials: true, // 쿠키와 인증 정보를 허용
}));

const session = require('express-session');

////////////////////////////////////////////////////

// Body-parser 설정
app.use(
    session({
        secret: 'mySecretKey', // 세션 암호화를 위한 키
        resave: false,         // 세션을 항상 저장하지 않음
        saveUninitialized: true, // 초기화되지 않은 세션도 저장
        cookie: { 
            httpOnly: true,    // 클라이언트에서 쿠키 접근 방지
            maxAge: 1000 * 60 * 60 * 24 // 쿠키 유효기간 (1일)
        },
    })
);
const boardRoutes = require('./routes/board');
const userRoutes = require('./routes/user');
app.use('uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/boards', boardRoutes);
app.use('/api/users',userRoutes);


let port = 4000;
const server = app.listen(port, () => {
    console.log(`server on localhost:${port}`);
});
