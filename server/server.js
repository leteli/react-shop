import http from 'http';

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((req, res) => {
  const state = {
    books: [
      { 
        id: 1,
        name: 'Империализм в XXI веке',
        author: 'Смит Д.',
        description: '',
        price: '900 ₽',
        picture: '/assets/item-img-1.jpg',
        inStock: true
      },
      {
        id: 2,
        name: 'Смерть языка',
        author: 'Гандельсман В.',
        description: '',
        price: '250 ₽',
        picture: '/assets/item-img-2.jpeg',
        inStock: true
      },
      {
        id: 3,
        name: 'Женщины на грани большого прорыва',
        author: 'Кнутсон У.',
        description: '',
        price: '980 ₽',
        picture: '/assets/item-img-3.jpg',
        inStock: true
      },
      {
        id: 4,
        name: 'Эмпиризм и философия сознания',
        author: 'Селларс У.',
        description: '',
        price: '540 ₽',
        picture: '/assets/item-img-4.png',
        inStock: true
      },
      {
        id: 5,
        name: 'Почему Россия отстала?',
        author: 'Травин Д.',
        description: '',
        price: '456 ₽',
        picture: '/assets/item-img-5.jpeg',
        inStock: false
      },
      {
        id: 6,
        name: 'Воззвание к жизни: против тирании рынка и государства',
        author: 'Ванейгем Р.',
        description: '',
        price: '470 ₽',
        picture: '/assets/item-img-6.jpg',
        inStock: true
      },
      {
        id: 7,
        name: 'Ориентализм',
        author: 'Саид Э.',
        description: '',
        price: '1358 ₽',
        picture: '/assets/item-img-7.jpg',
        inStock: true
      },
      {
        id: 8,
        name: 'Метла системы',
        author: 'Уоллес Д. Ф.',
        description: '',
        price: '956 ₽',        
        picture: '/assets/item-img-8.jpg',
        inStock: false
      },
      {
        id: 9,
        name: 'Повесть о Татариновой. Сектантские тексты',
        author: 'Радлова А.',
        description: '',
        price: '525 ₽',
        picture: '/assets/item-img-9.jpg',
        inStock: true
      },
      {
        id: 10,
        name: 'Прыжки на месте. Короткая проза',
        author: 'Беккет С.',
        description: '',
        price: '600 ₽',
        picture: '/assets/item-img-10.jpg',
        inStock: true
      },
    ],
    cart: [],
    users: [
      { userId: 1, name: 'user', role: 'user', authToken: 'user', password: 'admin' },
      { userId: 2, name: 'admin', role: 'admin', authToken: 'admin', password: 'admin' },
    ],
  };

  if (req.url === '/products' && req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);

    res.end(JSON.stringify(state.books));
  } else if (req.url === '^\/products\/id=(\d+)' && req.method === 'GET') {
    res.statusCode = 200;
    const productId = req.url.split('/').slice(-1);
    const productData = state.find((item) => item.id === Number(productId));
    res.end(JSON.stringify(productData));
  } else if (req.url === '^\/products\/id=(\d+)' && req.method === 'PUT') {
    res.statusCode = 200;
    const productId = req.url.split('/').slice(-1);
    const updatedData = req.body;
    const productData = state.find((item) => item.id === Number(productId));
    for (const key in updatedData) {
      if (productData[key] !== updatedData[key]) {
        productData[key] = updatedData[key];
      }
    }
    res.end(JSON.stringify(productData));
  } else if (req.url === '/cart' && req.method === 'GET') {
    res.statusCode = 200;
    res.end(JSON.stringify(state.cart));
  } else if (req.url === '/cart' && req.method === 'PUT') {
    res.statusCode = 200;
    const cartItemData = req.body;
    if (!cartItemData.quantity) {
      cartItemData.quantity = 1;
    }
    // cartItemData.inStock = false;
    state.cart.push(cartItemData);
    res.end(JSON.stringify(cartItemData));
  } else if (req.url === '/cart' && req.method === 'DELETE') {
    res.statusCode = 200;
    const { productId } = res.body;
    const newData = state.cart.filter((item) => item.productId !== productId);
    state.cart = newData;

    res.end(JSON.stringify()); //потом! разобраться с CartProductData
  } else if (req.url === '/cart' && req.method === 'DELETE') {
    res.statusCode = 200;
    state.cart = [];
    res.end(JSON.stringify([]));
  } else if (req.url === '/') {
    res.end('hey');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
});
