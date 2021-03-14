const express = require('express');
const fetch = require('./routes/fetch');
const deleteroute = require('./delete/delete');
const auth=require('./auth/authenticate');
const app = express();
const port = process.env.PORT | 8080;
app.use(express.json({}));

app.get('/', (req, res) => {
  res.send({Message: 'App Working'});
});
app.post('/register', fetch.register);
app.post('/login', fetch.login);
app.post('/addImages', fetch.addImages);
app.get('/getUserWithImages', fetch.getUserWithImages);
// eslint-disable-next-line max-len
app.post('/dashboard', auth.authenticate, fetch.dashboard);// middleware check only with postman
app.post('/refreshToken', fetch.refreshToken);
app.post('/deleteUserImages', deleteroute.deleteUserImages);
app.listen(port, () => {
  console.log('Server listening on port', port);
});
