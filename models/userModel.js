const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/users.json');

const getUsers = () => JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const saveUsers = (users) => fs.writeFileSync(dataPath, JSON.stringify(users, null, 2), 'utf8');

module.exports = { getUsers, saveUsers };
