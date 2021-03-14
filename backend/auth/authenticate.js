const jwt = require('jsonwebtoken');

module.exports={
  authenticate: (req, res, next) =>{
    const token = req.headers.authorization;
    console.log(token);
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) return res.sendStatus(403);
      req.email = user;
      next();
    });
  },
};
