const dao = require('../dao/dao.js');

module.exports={
  deleteUserImages: (req, res)=>{
    const {userId}=req.body;
    dao.deleteUserImages(userId).then((data)=>{
      dao.deleteUser(userId).then((data)=>{
        // eslint-disable-next-line max-len
        res.send({'Message': 'Successfully deleted user images', 'data': data, 'status': 200});
      });
    }).catch((err)=>{
      res.send({Message: 'Error Found', err, status: 401});
    });
  },
};

