import http from 'http';

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((req, res) => {
  if (req.url === '/items') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    const books = [
      { id: 1, title: 'Империализм в XXI веке', author: 'Смит Д.', price: '900 ₽', image: ''},
      { id: 2, title: 'Империализм в XXI веке', author: 'Смит Д.', price: '900 ₽', image: ''},
      { id: 3, title: 'Империализм в XXI веке', author: 'Смит Д.', price: '900 ₽', image: ''},
      { id: 4, title: 'Империализм в XXI веке', author: 'Смит Д.', price: '900 ₽', image: ''},
      { id: 5, title: 'Империализм в XXI веке', author: 'Смит Д.', price: '900 ₽', image: ''},
      { id: 6, title: 'Империализм в XXI веке', author: 'Смит Д.', price: '900 ₽', image: ''},
      { id: 7, title: 'Империализм в XXI веке', author: 'Смит Д.', price: '900 ₽', image: ''},
      { id: 8, title: 'Империализм в XXI веке', author: 'Смит Д.', price: '900 ₽', image: ''},
      { id: 9, title: 'Империализм в XXI веке', author: 'Смит Д.', price: '900 ₽', image: ''},
      { id: 10, title: 'Империализм в XXI веке', author: 'Смит Д.', price: '900 ₽', image: ''},
    ];
    res.end(JSON.stringify(books));
  }
  else if (req.url === '/') {
    res.end('hey');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})