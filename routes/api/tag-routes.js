const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Tag,
        model: Product,
      }
    ]
  }).then((tagData) => {
    res.json(tagData);
  }).catch((error) => {
    console.error('Error fetching tags and products.');
    res.status(500).json({ error: 'Internal server error ' });
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, {
    include: [
      {
        model: Tag,
        model: Product,
      }
    ]
  }).then((tagData) => {
    if (!tagData) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    res.json(tagData);
  }).catch((error) => {
    console.error('Error fetching tag id and products.');
    res.status(500).json({ error: 'Internal server error ' });
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((newTag) => {
      res.json(newTag);
    })
    .catch((err) => {
      res.json(err)
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body
    ,{
      // do i need to put the id here?
      where: {
        id: req.params.id,
      }
    },
  )
  res.status(200).json({message: 'Tag updated!'});
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    }
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
