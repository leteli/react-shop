import Express from 'express';
import getData from './mockDB.js';
import cors from 'cors';
const app = new Express();
app.use(cors());
app.use(Express.json());

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
  res.send();
});

app.post('/auth', (req, res) => {
  const { login, password } = req.body;
  console.log(login, password);
  const user = state.users.find((u) => u.login === login);
  if (!user || user.password !== password) {
    res.send({ errorStatus: 401 });
  }
  if (user) {
    res.status(200);
    res.send({ login });
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

  
app.listen(8080, () => {
  console.log('Server running on port 3000!');
});
