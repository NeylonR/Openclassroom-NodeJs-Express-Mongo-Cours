const express = require('express');
const mongoose = require('mongoose');

const exoapp = express();

const Product = require('./models/product');

mongoose.connect('mongodb+srv://admin:admin@cluster0.rmm0vg1.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

exoapp.use(express.json());

exoapp.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

exoapp.post('/api/products', (req, res, next) => {
    delete req.body._id;
    const product = new Product({
      ...req.body
    });
    product.save()
      .then(product => res.status(201).json({ product }))
      .catch(error => res.status(400).json({ error }));
});

exoapp.get('/api/products/:id', (req, res, next) => {
    Product.findOne({ _id: req.params.id })
      .then(product => res.status(200).json({ product }))
      .catch(error => res.status(404).json({ error }));
});

exoapp.get('/api/products', (req, res, next) => {
Product.find()
    .then(products => res.status(200).json({ products }))
    .catch(error => res.status(400).json({ error }));
});

exoapp.delete('/api/products/:id', (req, res, next) => {
    Product.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Deleted!'}))
      .catch(error => res.status(404).json({ error }));
});

exoapp.put('/api/products/:id', (req, res, next) => {
    Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(201).json({ message: 'Modified!'}))
    .catch(error => res.status(400).json({ error }));
});

module.exports = exoapp;