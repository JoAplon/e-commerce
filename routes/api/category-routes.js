const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    // be sure to include its associated Products
    include: [
      {
        model: Product,
      }
    ]
  }).then((categoryData) => {
    res.json(categoryData);
  }).catch((error) => {
    console.error('Error fetching categories and products.');
    res.status(500).json({ error: 'Internal server error ' });
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include: [
      {
        model: Product,
      }
    ]
  }).then((categoryData) => {
    if (!categoryData) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(categoryData);
  }).catch((error) => {
    console.error('Error fetching category id and products.');
    res.status(500).json({ error: 'Internal server error ' });
  });
});

router.post('/', (req, res) => {
  console.log(req.body);
  // create a new category
  Category.create({
    name: req.body.name
  })
    .then((newCategory) => {
      res.json(newCategory);
    })
    .catch((err) => {
      res.json(err)
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      name: req.body.name,
    },
    {
      // do i need to put the id here?
      where: {
        id: req.params.id,
      }
    },
  )
  .then((updatedCategory) => {
    if (updatedCategory[0] === 0) {
      return res.status(404).json({error: 'Category not found.'});
    }
    res.json({message: 'Category updated!'});
  })
  .catch((error) => {
    console.error('Error updating category');
    res.status(500).json({error: 'Internal server error.'});
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    }
  })
    .then((deletedCategory) => {
      res.json(deletedCategory);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
