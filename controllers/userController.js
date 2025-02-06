const fs = require('fs');
const path = require('path');

const userDataPath = path.join(__dirname, '../data/user.json');

const getUsers = (req, res) => {
    const users = JSON.parse(fs.readFileSync(userDataPath, 'utf8'));
    res.json(users);
};

const updateUser = (req, res) => {
    const users = JSON.parse(fs.readFileSync(userDataPath, 'utf8'));
    const userIndex = users.findIndex((u) => u.userId === Number(req.params.userId));

    if (userIndex === -1) {
        return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    users[userIndex] = {
        ...users[userIndex],
        ...req.body,
        profileImage: req.file ? `/uploads/${req.file.filename}` : users[userIndex].profileImage
    };

    fs.writeFileSync(userDataPath, JSON.stringify(users, null, 2), 'utf8');
    res.status(200).json(users[userIndex]);
};

module.exports = { getUsers, updateUser };
