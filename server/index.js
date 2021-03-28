require('dotenv').config();
const express = require('express');
const massive = require('massive');
const products_controller = require("./controller/products_controller");


const app = express()
const { SERVER_PORT, CONNECTION_STRING } = process.env


massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
}).then((dbInstance) => {
  app.set('db', dbInstance);
  console.log('db connected')
})
  .catch(err => console.log(err));


app.use(express.json());

app.post('/api/controller/products', products_controller.create);
app.get('/api/controller/products', products_controller.getAll);
app.get('/api/controller/products/:id', products_controller.getOne);
app.put('api/controller/products/:id', products_controller.update);
app.delete('/api/controller/products/:id', products_controller.delete);


app.listen(SERVER_PORT, () => console.log(`Heck yes, server running on ${SERVER_PORT}`));