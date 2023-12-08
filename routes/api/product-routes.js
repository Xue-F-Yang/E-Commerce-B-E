const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// get all products
router.get('/', (req, res) => {
  Product.findAll({
    include: [Category, Tag]
  }).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.status(500).json(err);
  });
});

// get one product
router.get('/:id', (req, res) => {
  Product.findByPk(req.params.id, {
    include: [Category, Tag]
  }).then((data) => {
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  }).catch((err) => {
    res.status(500).json(err);
  });
});

// create new product
router.post('/', (req, res) => {
  Product.create(req.body)
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(201).json(product);
    })
    .then((productTagIds) => res.status(201).json(productTagIds))
    .catch((err) => {
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      if (result[0] === 1) {
        res.json({ message: 'Product updated successfully' });
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// delete product
router.delete('/:id', (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id
    }
  }).then((result) => {
    if (result === 1) {
      res.json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  }).catch((err) => {
    res.status(500).json(err);
  });
});

module.exports = router;