// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
const products = require("../models/products");

// define the product model
let product = require("../models/products");

/* GET products List page. READ */
router.get("/", (req, res, next) => {
  // find all products in the products collection
  product.find((err, products) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("products/index", {
        title: "Products",
        products: products,
      });
    }
  });
});

//  GET the Product Details page in order to add a new Product
router.get("/add", (req, res, next) => {
  res.render("products/add", { title: "Add Book" });
});

// POST process the Product Details page and create a new Product - CREATE
router.post("/add", (req, res, next) => {
  let newProduct = product({
    Productid: req.body.Productid,
    Productname: req.body.Productname,
    Description: req.body.Description,
    Price: req.body.Price,
  });

  product.create(newProduct, (err, product) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/products");
    }
  });
});

// GET the Product Details page in order to edit an existing Product
router.get("/details/:id", (req, res, next) => {
  let id = req.params.id;
  product.findById(id, (err, productToEdit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.render("products/details", {
        title: "Edit Product",
        product: productToEdit,
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post("/details/:id", (req, res, next) => {
  let id = req.params.id;

  let updatedProduct = product({
    _id: id,
    Productid: req.body.Productid,
    Productname: req.body.Productname,
    Description: req.body.Description,
    Price: req.body.Price,
  });

  product.updateOne({ _id: id }, updatedProduct, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/products");
    }
  });
});

// GET - process the delete
router.get("/delete/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id;

  product.deleteMany({ Productname: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/products");
    }
  });
});

module.exports = router;
