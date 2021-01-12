const DbConnection = require('../util/database');

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return DbConnection.execute(
      "INSERT INTO product (title, image_url, description, price) VALUES (?, ?, ?, ?)",
      [this.title, this.imageUrl, this.description, this.price]
    );
  }

  static fetchAll() {
    return DbConnection.promise().query("SELECT * FROM product");
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
