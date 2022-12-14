const express = require('express');
const path = require('path');

const { getData } = require('./mockDB.js');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

const state = getData();

app.get('/products', (req, res) => {
  res.send(state.products);
});

app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    const productData = state.products.find((pr) => pr.id === Number(id));
    res.send(productData);
});

app.put('/products/:id', (req, res) => {
  const updatedData = req.body;
  const productData = state.products.find((pr) => pr.id === Number(updatedData.id));
  for (const key in updatedData) {
    if (productData[key] !== updatedData[key]) {
      productData[key] = updatedData[key];
    }
  }
  res.send({ ...productData });
});

app.put('/cart/add', (req, res) => {
  const productData = req.body;
  const restProducts = state.cart.filter((pr) => pr.id !== productData.id);
  state.cart = [...restProducts, productData];
  res.send(productData);
});

app.get('/cart/all', (req, res) => {
  res.send(state.cart);
});

app.delete('/cart/remove', (req, res) => {
  const { id } = req.body;
  const restProducts = state.cart.filter((pr) => pr.id !== id);
  state.cart = restProducts;
  res.send({ id });
});

app.delete('/cart/clear', (req, res) => {
  state.cart = [];
  res.send(state.cart);
});

app.post('/auth', (req, res) => { // ADD TOKEN!!
  const { login, password } = req.body;
  console.log(login, password);
  const user = state.users.find((u) => u.login === login);
  if (!user || user.password !== password) {
    res.status(401).send({ errorStatus: 401 }); // mb throw error?
  }
  if (user) {
    res.status(200);
    res.send({ login });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});
