const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.id = getRandomInt(1000000);
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static fetch(id , cb) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb(null)
      } else {
        const products = JSON.parse(fileContent);
        cb(products.filter(product => product.id == id)[0]);
      }
    });
  }
};
