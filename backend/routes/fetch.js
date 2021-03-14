require('dotenv').config();
// const express = require('express');
const dao = require('../dao/dao.js');
const jwt = require('jsonwebtoken');
console.log(process.env.ACCESS_TOKEN, 'ACCESS_TOKEN');
const refreshTokens = [];
module.exports={
  register: (req, res)=>{
    const {name, phone, email, password}=req.body;
    dao.register(name, phone, email, password).then((data)=>{
      res.send({'Message': 'Successfully inserted user', 'status': 201});
    }).catch((err)=>{
      res.send({Message: 'Error Found', err, status: 401});
    });
  },
  addImages: (req, res)=>{
    const {imagePath, userId}=req.body;
    dao.addImages(imagePath, userId).then((data)=>{
      res.send({'Message': 'Successfully inserted images', 'status': 201});
    }).catch((err)=>{
      res.send({Message: 'Error Found', err, status: 401});
    });
  },
  login: (req, res) => {
    const {email, password} = req.body;
    dao.login(email, password).then((data)=>{
      console.log(data, 'data');
      if (data.length===0) res.send({Message: 'User not matched', status: 404});
      const accessToken = generateAccessToken({email: data[0].email});
      // eslint-disable-next-line max-len
      const refreshToken = jwt.sign({email: data[0].email}, process.env.REFRESH_TOKEN);
      refreshTokens.push(refreshToken);
      // eslint-disable-next-line max-len
      return res.send({'accessToken': accessToken, 'refreshToken': refreshToken, 'status': 200});
    }).catch((err)=>{
      res.send({Message: 'Error found', status: 401});
    });
  },
  dashboard: (req, res)=>{
    console.log(req.email.email, 'user');
    res.send({Message: req.email});
  },
  getUserWithImages: (req, res)=>{
    dao.getUserWithImages().then((data)=>{
      // eslint-disable-next-line max-len
      res.send({'Message': 'Successfully fetched user images', 'data': data, 'status': 200});
    }).catch((err)=>{
      res.send({Message: 'Error Found', err, status: 401});
    });
  },
  refreshToken: (req, res)=>{
    const refreshToken = req.body.refreshToken;
    if (refreshToken == null) return res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, email) => {
      if (err) return res.sendStatus(403);
      console.log(email.email, 'email');
      const accessToken = generateAccessToken({email: email.email});
      res.json({accessToken: accessToken});
    });
  },

};
generateAccessToken=(email) =>{
  return jwt.sign(email, process.env.ACCESS_TOKEN, {expiresIn: '60s'});
};

