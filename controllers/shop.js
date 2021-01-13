const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = async (req, res, next) => {
  const products = await Product.findAll();
  res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
  });
};

exports.getIndex = async (req, res, next) => {
  const products = await Product.findAll();
  res.render('shop/index', {
    prods: products,
    pageTitle: 'Shop',
    path: '/'
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.postCart = (req, res, next) => {
  Product.fetch(req.body.id, product => {
    Cart.addItem(product);

    res.redirect('/');
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
