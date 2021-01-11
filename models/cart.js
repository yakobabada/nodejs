const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addItem(product) {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        prod => prod.id === product.id
      );

      // Add new product/ increase quantity
      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].qty += 1;
      } else {
        cart.products = [...cart.products, { id: product.id, qty: 1 }];
      }

      cart.totalPrice += product.price;

      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  }
};
