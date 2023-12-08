const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', (req, res, next) => {
  Tag.findAll({
    include: Product
  }).then((data) => {
    res.json(data);
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  Tag.findByPk(req.params.id, {
    include: Product
  }).then((data) => {
    res.json(data);
  }).catch(next);
});

router.post('/', (req, res, next) => {
  Tag.create(req.body).then((data) => {
    res.json(data);
  }).catch(next);
});

router.put('/:id', (req, res, next) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then((data) => {
    res.json(data);
  }).catch(next);
});

router.delete('/:id', (req, res, next) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then((data) => {
    res.json(data);
  }).catch(next);
});

router.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

module.exports = router;