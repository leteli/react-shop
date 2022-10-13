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
  res.send(productData);
});

app.put('/cart/add', (req, res) => {
  const productData = req.body;
  const restProducts = state.cart.filter((pr) => pr.id !== productData.id);
  state.cart = [...restProducts, productData];
  console.log(state.cart);
  res.send(productData);
});

app.get('/cart/all', (req, res) => {
  console.log(state.cart);
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
  res.send([]);
});

app.get('/auth', (req, res) => {
    res.send();
})

app.get('/', (req, res) => {
  res.send('Hello World!');
});

  
app.listen(8080, () => {
  console.log('Server running on port 3000!');
});
