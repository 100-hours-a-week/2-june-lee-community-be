const { getUsers, saveUsers } = require('../models/userModel');


// 세션 설정

// 사용자 데이터
// const getAllUsers = (req,res) => {
//     const users = getUsers();
//     const filteredUsers = boards.filter((b) => !b.deleteFlag);
//     res.json(filteredUsers);
// }

// 인증된 사용자인지 확인하는 미들웨어
const requireAuth = (req, res, next) => {
    if (req.session.userId) {
        next(); // 세션 정보가 있으면 다음으로 진행
        res.status(200).json({message: '인증되었습니다.'});
    } else {
        res.status(401).json({ message: '인증이 필요합니다.' });
    }
};

const pwdCheck = (value)=>{
    return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/.test(value);
}

//이메일 중복 체크
const emailCheck = (inputEmail) => {
    const users = getUsers();
    const user = users.find((u) => (u.email === inputEmail) && (!u.deleteFlag));
    if(!user) {
        return true;
        // res.status(200).json({message: "available_email"});
    }
    else{
        return false;
        // res.status(400).json({message: "already_exist_email"});
    }
};

//닉네임 중복 체크
const nicknameCheck = (inputNickname) => {
    const users = getUsers();
    const user = users.find((u) => (u.nickname === inputNickname) && (!u.deleteFlag));
    if(!user) {
        return true;
        // res.status(200).json({message: "available_nickname"});
    }
    else{
        return false;
        // res.status(400).json({message: "already_exist_nickname"});
    }
};

//현재 접속한 유저 정보 가져오기
const getUsersInform = (req, res) => {
    const userId = req.session.userId; // 세션에서 userId 가져오기
    if (!userId) {
        return res.status(401).json({ message: '로그인이 필요합니다.' });
    }
    const users = getUsers();
    const userIndex = users.findIndex((u) => u.userId === userId);

    if (userIndex === -1) {
        return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }
    res.status(200).json(users[userIndex]);
};

const getUserInformByWriterId = (req, res) => {
    const users = getUsers();
    const userIndex = users.findIndex((u) => u.userId === req.params.writerId);

    if (userIndex === -1) {
        return res.status(404).json({ message: '작성자를 찾을 수 없습니다.' });
    }
    res.status(200).json(users[userIndex]);
};
// 로그인 API
const loginUser = (req, res) =>{
    const users = getUsers();
    const user = users.find((u) => (u.email === req.body.email) && (u.password === req.body.password) && (!u.deleteFlag));

    if (user) {
        // 세션에 사용자 정보 저장
        req.session.userId = user.userId;
        res.status(200).json({ message: '로그인 성공' });
    } else {
        res.status(401).json({ message: '아이디 또는 비밀번호가 잘못되었습니다.' });
    }
};

//회원가입
const signUpUser = (req, res) =>{
    if(!pwdCheck(req.body.password)){
        return res.status(400).json({message: 'invalid_password'});
    }
    else if(!emailCheck(req.body.email)){
        return res.status(400).json({message: "already_exist_email"});
    }
    else if(!nicknameCheck(req.body.nickname)){
        res.status(400).json({message: "already_exist_nickname"});
    }
    const users = getUsers();
    const newUser = {
        userId: users.length +1,
        nickname: req.body.nickname,
        email: req.body.email,
        password: req.body.password,
        profileImage: req.file ? `/uploads/${req.file.filename}` : `/public/images/default.jpg`,
    };
    users.push(newUser);
    saveUsers(users);
    res.status(201).json(newUser);
};

// 로그아웃 API
const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: '로그아웃 중 오류가 발생했습니다.' });
        }
        res.status(200).json({ message: '로그아웃 성공' });
    });
};

// 회원정보 변경
const updateUser = (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).json({ message: '로그인이 필요합니다.' });
    }
    const users = getUsers();
    const userIndex = users.findIndex((u) => u.userId === userId);

    if (userIndex === -1) {
        return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }
    if(!nicknameCheck(req.body.nickname)){
        res.status(400).json({message: "already_exist_nickname"});
    }

    users[userIndex] = {
        ...users[userIndex],
        nickname: req.body.nickname ? req.body.nickname : users[userIndex].nickname,
        password: req.body.password ? req.body.password : users[userIndex].password,
        profileImage: req.file ? `/uploads/${req.file.filename}` : users[userIndex].profileImage
    };

    saveUsers(users);
    res.status(200).json(users[userIndex]);
};

//회원탈퇴(소프트)
const deleteUser = (req, res) => {
    try {
        const userId = req.session.userId; // 세션에서 userId 가져오기
        if (!userId) {
            return res.status(401).json({ message: '로그인이 필요합니다.' });
        }
        const Users = getUsers();
        const UserIndex = Users.findIndex((b) => b.id === userId);

        if (UserIndex === -1) {
            return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
        }

        // 소프트 딜리트
        Users[UserIndex].deleteFlag = true;

        saveUsers(Users);
        res.status(200).json({ message: '게시글이 삭제되었습니다.', User: Users[UserIndex] });
    } catch (error) {
        console.error('게시글 삭제 중 오류 발생:', error);
        res.status(500).json({ message: '게시글 삭제 중 오류가 발생했습니다.' });
    }
};

module.exports = {requireAuth, getUsersInform, getUserInformByWriterId, loginUser, signUpUser, logoutUser ,updateUser, deleteUser};
