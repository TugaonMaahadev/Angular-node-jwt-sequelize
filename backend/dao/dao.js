const Sequelize = require('sequelize');

const path = 'mysql://root:password@localhost:3306/nodetest';
const sequelize = new Sequelize(path, {operatorsAliases: false});

sequelize.authenticate().then(() => {
  console.log('Connection successfully connected');
}).catch((err) => {
  console.error('connection err', err);
});
// table model structure
const users = sequelize.define('users', {
  user_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
}, {
  timestamps: false,
});
const images = sequelize.define('images', {
  images_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  images_path: {
    type: Sequelize.STRING,
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users', // 'users' refers to table name
      key: 'user_id', // 'id' refers to column name in users table
    },
  },
}, {
  timestamps: false,
});
module.exports={
  register: (name, phone, email, password)=>{
    console.log(images);
    return new Promise((resolve, reject)=>{
      users.create({
        name: name,
        phone: phone,
        email: email,
        password: password,
      }).then(function(users) {
        if (users) {
          resolve(users);
        }
      }).catch((err)=>{
        reject(err);
      });
    });
  },
  // add images to the users
  addImages: (imagePath, userId)=>{
    console.log(imagePath, userId);
    return new Promise((resolve, reject)=>{
      images.create({
        images_path: imagePath,
        user_id: userId,
      }).then(function(users) {
        if (users) {
          // response.send(users);
          resolve(users);
        }
      }).catch((err)=>{
        reject(err);
      });
    });
  },
  // login query
  login: (email, password)=>{
    return new Promise((resolve, reject)=>{
      // eslint-disable-next-line max-len
      sequelize.query('SELECT * FROM users where email="'+email+'" and password="'+password+'"', {type: sequelize.QueryTypes.SELECT})
          .then(function(users) {
            resolve(users);
          }).catch((err)=>{
            reject(err);
          });
    });
  },
  // get user with all images
  getUserWithImages: ()=>{
    return new Promise((resolve, reject)=>{
      // eslint-disable-next-line max-len
      sequelize.query('SELECT * FROM users INNER JOIN images ON users.user_id=images.user_id', {type: sequelize.QueryTypes.SELECT})
          .then(function(users) {
            resolve(users);
          }).catch((err)=>{
            reject(err);
          });
    });
  },
  // delete user images
  deleteUserImages: (userId)=>{
    return new Promise((resolve, reject)=>{
      // eslint-disable-next-line max-len
      sequelize.query('DELETE from images where user_id='+userId+'', {type: sequelize.QueryTypes.DELETE})
          .then(function(users) {
            resolve(users);
          }).catch((err)=>{
            reject(err);
          });
    });
  },
  deleteUser: (userId)=>{
    return new Promise((resolve, reject)=>{
      // eslint-disable-next-line max-len
      sequelize.query('DELETE from users where user_id='+userId+'', {type: sequelize.QueryTypes.DELETE})
          .then(function(users) {
            resolve(users);
          }).catch((err)=>{
            reject(err);
          });
    });
  },
};
