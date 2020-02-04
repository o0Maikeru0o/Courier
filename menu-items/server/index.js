/* eslint-disable radix */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const parser = require('body-parser');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost/menu', { useNewUrlParser: true }).then(() => console.log('db connected'));

const MenuItem = require('./models/MenuItem.js');

app.use('/:menu', express.static(path.join(__dirname, '../client/dist')));
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

app.get('/api/menu/:menu', function (req, res) {
  const menu = parseInt(req.params.menu);
  if (menu > 100) {
    res.status(404).send();
  } else {
    MenuItem.getMenu({ menu }).then(data => res.status(202).send(data)).catch(err => console.log(`API Error:${err}`));
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
