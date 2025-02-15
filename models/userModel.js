const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/users.json');

const getUsers = () => JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const saveUsers = (users) => {
    try{
        console.log('Saving users to:', dataPath);
        console.log('Users data:', JSON.stringify(users, null, 2));
        fs.writeFileSync(dataPath, JSON.stringify(users, null, 2), 'utf8');
    } catch(error){
        console.error('Error saving users:', error);
        throw error;
    }
}

module.exports = { getUsers, saveUsers };
