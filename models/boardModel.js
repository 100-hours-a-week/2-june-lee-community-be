const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/boards.json');

// const getBoards = () => {
//     const jsonData = fs.readFileSync(dataPath, 'utf8');
//     return JSON.parse(jsonData);
// };

// const saveBoards = (boards) => {
//     fs.writeFileSync(dataPath, JSON.stringify(boards, null, 2), 'utf8');
// };

const getBoards = () => JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const saveBoards = (boards) => fs.writeFileSync(dataPath, JSON.stringify(boards, null, 2), 'utf8');

module.exports = { getBoards, saveBoards };
